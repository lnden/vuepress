 # Git工具
 
 今天我先记录一些git的常用命令
 
 
## git常用命令

- git status #

- git add -A #

- git commit -m'desc'

- git log


## git查看分支命令

- git branch -l #查看本地分支

- git branch -r #查看远程分支

- git branch -a #查看全部分支(远程的和本地的)

## git配置用户名与邮箱

- git config user.name #查看当前用户名

- git config user.email #查看当前邮箱地址

- git config user.name &lt;username&gt; #设置本地用户名

- git config user.email &lt;useremail&gt; #设置本地邮箱地址

- git config --global user.name &lt;username&gt; #设置全局用户名

- git config --global user.email &lt;useremail&gt; #设置全局邮箱地址

- git config --list #查看全局配置信息


## fork代码同步更新

- git remote -v #查看当前项目的远程仓库配置

- git remote add upstream &lt;原始项目仓库git地址&gt; #把原项目的远程仓库添加到fork的代码的远程库中

- git remote -v #可以看到当前项目和原项目的远程仓库配置

- git fetch upstream/git pull upstream #拉去最新的代码

- git merge upstream/master #upstream合并到master分支查看更新内容

- git push #把更新过来的内容提交到自己的版本库

- New pull request #找到自己fork的仓库进行PR 把版本库里的内容请求合并到远程你fork那个主库上


## git标签的使用

- git tag #查看所有的tag标签

- git tag -a v1.0.0 -m 'version 20180817 ' #创建一个带有描述的tag标签

- git checkout -b branch_name tag_name #切换到指定标签且新分支

- git tag -l v1.0.*  #查看某个版本系列的tag

- git show v1.0.0 #查看标签的详情，可以看到你commit的内容

- git push origin v1.0.0 #推送标签到远程版本库

- git tag -d v1.0.0 #删除本地标签

- git push origin :refs/tags/v1.0.0 #删除远程标签



