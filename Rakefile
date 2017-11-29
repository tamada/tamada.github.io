require 'fileutils'

TARGET_DIR = "./public";
THEME_DIR = "./themes"

task :default => :build

task :init do
  init_submodule()
  init_worktree()
end

task :server do
  hugo("server")
end

task :server_draft do
  hugo("server --buildDraft")
end

task :build => [ :init ] do
  hugo_build()
end

task :clean do
  if File.exist?(TARGET_DIR)
    FileUtils.rm_r(TARGET_DIR)
  end
end

task :deploy => [ :build ] do
  pull_gh_pages()
  publish_gh_pages()
end

def init_submodule()
  unless File.exist?(THEME_DIR)
    FileUtils.mkdir(THEME_DIR)
  end
  sh 'git submodule init'
  sh 'git submodule sync'
  sh 'git submodule update'
end

def init_worktree()
  unless ghpages_exist?()
    sh 'git branch gh-pages origin/gh-pages'
  end
  unless File.exist?(TARGET_DIR)
    sh 'git worktree add public gh-pages'
  end
end

def ghpages_exist?()
  branches = `git branch`.split("\n")
  branches.each{|item|
    branch_name = item.strip()
    if branch_name == "gh-pages" or branch_name == "* gh-pages"
      return true
    end
  }
  return false
end

def pull_gh_pages(dir = TARGET_DIR)
  cd dir do
    update_ghpages();
  end
end

def update_ghpages()
  sh 'git pull origin gh-pages'
end

def hugo_build()
  hugo()
end

def publish_gh_pages(dir = TARGET_DIR)
  cd dir do
    commit()
    push_to_ghpages()
  end
end

def push_to_ghpages()
  sh 'git push origin gh-pages'
end

def commit()
  sh 'git add .'
  sh 'git commit -m "auto commit: for deployment"'
end

def hugo(subcommand = "")
  sh "hugo --buildFuture #{subcommand}"
end

