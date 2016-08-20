using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using utils.filetest;
using 部署文件.modifile;
namespace 部署文件
{
    static class CopyFilesManger
    {
        //F:\workspace\EGameClient6
        public static string copytargetbuild;
        public static string copyresourcebuild;
        private static List<string> templist;
        static CopyFilesManger()
        {
            copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-debug\";
            templist = ChangedFilesManager.GetInstance().filePathList;
        }
        /// <summary>
        /// 将修改的文件从bin-debug覆盖到项目build中,供调试用;
        /// </summary>
        public static void copyFilesToProgramBuild()
        {
            Log.trace("=====将修改文件copy到项目测试用文件中开始====");
            
            foreach(var file in templist)
            {

                // string provider = "mayayl"
                copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-debug\";
                copytargetbuild = PathManager.GetInstance().ProgramPath + @"\build\mayayl\";
                if (file.Contains("Main.swf"))
                {
                    continue;
                }
                if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild + file, copytargetbuild+System.IO.Path.GetDirectoryName(file)))
                {
                    Log.trace("文件copy到 " + copytargetbuild + file + " 成功");
                }
                else
                {
                    Log.trace("文件copy到 " + copytargetbuild + file + " 失败");
                };
                // string provider = "classic"
                string findPath = PathManager.GetInstance().findPathByfile(System.IO.Path.GetFileName(file)) ;
                
                copytargetbuild = PathManager.GetInstance().ProgramPath + @"\build\classic\";

                if (file.Contains("Main.swf"))
                {//main.swf 不copy;
                    continue;
                }
                else if (file.Contains(".xml"))
                {
                    //从bin-debug 中copy 配置文件
                    copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-debug\" + file;
                }
                else if (file.Contains(".swf"))
                {
                    copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\resource\fla\classic\mayal-20151210\" + findPath + @"\" + System.IO.Path.GetFileName(file);
                }

                if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild + System.IO.Path.GetDirectoryName(file)))
                {
                    Log.trace("文件copy到 " + copytargetbuild + file + " 成功");
                }
                else
                {
                    Log.trace("文件copy到 " + copytargetbuild + file + " 失败");
                };
                
            }

            //config.json 每个代理商不同,所以在build中直接自动查找需要修改的内容进行修改;
            //下面是mayayl的config.json,修改的是bin-debug中的config,所以要重新copy一下;
            copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-debug\";
            copytargetbuild = PathManager.GetInstance().ProgramPath + @"\build\mayayl\";

            if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild + @"game\json\config.json", copytargetbuild + @"game\json\"))
            {
                Log.trace("文件copy到 " + copytargetbuild + @"game\json\config.json" + " 成功");
            }
            else
            {
                Log.trace("文件copy到 " + copytargetbuild + @"game\json\config.json" + " 失败");
            };
        }

        
        /// <summary>
        /// 将修改的文件复制到文件整理目录中去
        /// </summary>
        public static void copyToPublish()
        {
            Log.trace("=====将修改文件copy到公布更新用文件中开始====");
           
            //创建文件夹
            string createDirect = @"C_" + DateTime.Now.ToString("yyMMddhhmm");
            copytargetbuild = PathManager.GetInstance().CopyPath;
            FilesAndDirsChangeManager.hasDirectory(copytargetbuild + @"\"+createDirect, true);
            ReadmeConfig.path = copytargetbuild + @"\"+createDirect;
            ReadmeConfig.addStartTitle();
            foreach (var file in templist)
            {
                if (file.Contains("Main.swf"))
                {
                    //copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-release\Main-encrypt.swf";
                    //copytargetbuild = PathManager.GetInstance().ProgramPath + @"\bin-release\Game.swf";
                    //if (RecursiveFileSearch.renameFiles(copyresourcebuild, copytargetbuild))
                    //{
                    //    Log.trace("Main.swf 重命名成功");
                    //};
                    copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\" + System.IO.Path.GetDirectoryName(file) + @"\" +System.IO.Path.GetFileNameWithoutExtension(file)+ @"-encrypt.swf";
                    copytargetbuild = PathManager.GetInstance().CopyPath +@"\"+ createDirect+@"\Game.swf" ;
                    if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                    {
                        Log.trace("文件copy到 " + copytargetbuild  + " 成功");
                        ReadmeConfig.addConfig("Game.swf", @"/" + PathManager.mayayl + @"/game/");
                        ReadmeConfig.addConfig("Game.swf", @"/" + PathManager.classic + @"/game/");
                        ReadmeConfig.addConfig("Game.swf", @"/" + PathManager.junbo + @"/game/");
                    }
                    else
                    {
                        Log.trace("文件copy到 " + copytargetbuild  + " 失败");
                    };
                }
                else if (file.Contains("Locale.xml"))
                {
                        copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-debug\" + file;
                        copytargetbuild = PathManager.GetInstance().CopyPath + @"\" + createDirect;
                        FilesAndDirsChangeManager.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect, true);
                        if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                        {
                            Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(file) + " 成功");
                            
                            ReadmeConfig.addConfig("Locale.xml", @"/mayayl/game/resource/global/zh_cn/");
                            ReadmeConfig.addConfig("Locale.xml", @"/classic/game/resource/global/zh_cn/");
                            ReadmeConfig.addConfig("Locale.xml", @"/junbo/game/resource/global/zh_cn/");
                        }
                        else
                        {
                            Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(file) + " 失败");
                        };
                }else
                {
                    if(file.Contains(".swf"))
                    {
                       // string provider = "mayayl"
                       
                        copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-debug\" + System.IO.Path.GetDirectoryName(file)+@"\"+ System.IO.Path.GetFileNameWithoutExtension(file) + @"-encrypt.swf";
                        copytargetbuild = PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.mayayl + @"\" + System.IO.Path.GetFileName(file);
                        FilesAndDirsChangeManager.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.mayayl, true);
                        if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 成功");
                            ReadmeConfig.addConfig(PathManager.mayayl + @"/" + System.IO.Path.GetFileName(file), @"/" + PathManager.mayayl + @"/" + System.IO.Path.GetDirectoryName(file) + @"/");
                        }
                        else
                        {   
                            Log.trace("文件copy到 " + copytargetbuild + " 失败");
                        };
                        // string provider = "classic"
                        string findPath = PathManager.GetInstance().findPathByfile(System.IO.Path.GetFileName(file));
                        FilesAndDirsChangeManager.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.classic,true);
                        copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\resource\fla\classic\mayal-20151210\" +findPath+@"\"+ System.IO.Path.GetFileNameWithoutExtension(file) + @"-encrypt.swf";
                        copytargetbuild = PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.classic + @"\" + System.IO.Path.GetFileName(file);
                        if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 成功");
                            ReadmeConfig.addConfig(PathManager.classic + @"/" + System.IO.Path.GetFileName(file), @"/" + PathManager.classic + @"/" + System.IO.Path.GetDirectoryName(file) + @"/");
                        }
                        else
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 失败");
                        };

                        // string provider = "junbo"
                        findPath = PathManager.GetInstance().findPathByfile(System.IO.Path.GetFileName(file));
                        FilesAndDirsChangeManager.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.junbo, true);
                        copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\resource\fla\classic\mayal-20151210\" + findPath + @"\" + System.IO.Path.GetFileNameWithoutExtension(file) + @"-encrypt.swf";
                        copytargetbuild = PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.junbo + @"\" + System.IO.Path.GetFileName(file);
                        if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 成功");
                            ReadmeConfig.addConfig(PathManager.junbo + @"/" + System.IO.Path.GetFileName(file), @"/" + PathManager.junbo + @"/" + System.IO.Path.GetDirectoryName(file) + @"/");
                        }
                        else
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 失败");
                        };
                    }
                    
                }
            }
            //copy 自动修改的config.json

            // string provider = "mayayl"

            copyresourcebuild = PathManager.GetInstance().ProgramPath +ModifyConfig.mayaPath+ModifyConfig.configName;
            copytargetbuild = PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.mayayl + @"\";
            FilesAndDirsChangeManager.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.mayayl, true);
            if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
            {
                Log.trace("文件copy到 " + copytargetbuild +System.IO.Path.GetFileName(copyresourcebuild)+ " 成功");
                ReadmeConfig.addConfig(PathManager.mayayl + @"/" + ModifyConfig.configName, @"/mayayl/game/json/");
            }
            else
            {
                Log.trace("文件copy到 " + copytargetbuild +System.IO.Path.GetFileName(copyresourcebuild)+ " 失败");
            };
            // string provider = "classic"
            copyresourcebuild = PathManager.GetInstance().ProgramPath + ModifyConfig.classicPath + ModifyConfig.configName;
            copytargetbuild = PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.classic + @"\";
            FilesAndDirsChangeManager.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.classic, true);
            if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
            {
                Log.trace("文件copy到 " + copytargetbuild  + System.IO.Path.GetFileName(copyresourcebuild) + " 成功");
                ReadmeConfig.addConfig(PathManager.classic + @"/" + ModifyConfig.configName, @"/classic/game/json/");

            }
            else
            {
                Log.trace("文件copy到 " + copytargetbuild  + System.IO.Path.GetFileName(copyresourcebuild) + " 失败");
            };

            // string provider = "junbo"
            copyresourcebuild = PathManager.GetInstance().ProgramPath + ModifyConfig.junboPath + ModifyConfig.configName;
            copytargetbuild = PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.junbo + @"\";
            FilesAndDirsChangeManager.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.junbo, true);
            if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
            {
                Log.trace("文件copy到 " + copytargetbuild  + System.IO.Path.GetFileName(copyresourcebuild) + " 成功");
                ReadmeConfig.addConfig(PathManager.junbo + @"/" + ModifyConfig.configName, @"/junbo/game/json/");
            }
            else
            {
                Log.trace("文件copy到 " + copytargetbuild  + System.IO.Path.GetFileName(copyresourcebuild) + " 失败");
            };

        }
        /// <summary>
        /// ftp文件更新
        /// 文件夹不可自动生成,必须以覆盖和添加新文件的方式操作
        /// 只有在测试用的时候打开
        /// </summary>
        public static void copyFilesToftp()
        {
            Log.trace("=====将修改文件copy到ftp文件中开始====");
            //每次ftp更新前,需要清理掉原有的日志;
            Log.isFirstFtpLog = true;
            //创建文件夹
            copytargetbuild = PathManager.GetInstance().FtpPath;
           // RecursiveFileSearch.hasDirectory(copytargetbuild, true);
            foreach (var file in templist)
            {
                if (file.Contains( "Main.swf"))
                {
                    //copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-release\Main-encrypt.swf";
                    //copytargetbuild = PathManager.GetInstance().ProgramPath + @"\bin-release\Game.swf";
                    //if (RecursiveFileSearch.renameFiles(copyresourcebuild, copytargetbuild))
                    //{
                    //    Log.trace("Main.swf 重命名成功");
                    //};
                    copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\" + System.IO.Path.GetDirectoryName(file) + @"\" + System.IO.Path.GetFileNameWithoutExtension(file) + @"-encrypt.swf";
                    copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.mayayl + @"\game\Game.swf";
                   // RecursiveFileSearch.hasDirectory(System.IO.Path.GetDirectoryName(copytargetbuild), true);
                    if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                    {
                        Log.trace("文件copy到 " + copytargetbuild + " 成功");
                        Log.ftpLog(copytargetbuild );
                    }
                    else
                    {
                        Log.trace("文件copy到 " + copytargetbuild + " 失败");
                    };
                    copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\" + System.IO.Path.GetDirectoryName(file) + @"\" + System.IO.Path.GetFileNameWithoutExtension(file) + @"-encrypt.swf";
                    copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.classic + @"\game\Game.swf";
                   // RecursiveFileSearch.hasDirectory(System.IO.Path.GetDirectoryName(copytargetbuild), true);
                    if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                    {
                        Log.trace("文件copy到 " + copytargetbuild + " 成功");
                        Log.ftpLog(copytargetbuild );
                    }
                    else
                    {
                        Log.trace("文件copy到 " + copytargetbuild + " 失败");
                    };
                    copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.junbo + @"\game\Game.swf";
                   // RecursiveFileSearch.hasDirectory(System.IO.Path.GetDirectoryName(copytargetbuild), true);
                    if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                    {
                        Log.trace("文件copy到 " + copytargetbuild + " 成功");
                        Log.ftpLog(copytargetbuild );
                    }
                    else
                    {
                        Log.trace("文件copy到 " + copytargetbuild + " 失败");
                    };
                }
                else
                {
                    if(file.Contains(@".xml"))
                    {
                        foreach(var str in PathManager.gongying)
                        {
                            copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-debug\" + file;
                            copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + str + @"\" + System.IO.Path.GetDirectoryName(file);
                    //        RecursiveFileSearch.hasDirectory(copytargetbuild, true);
                            if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                            {
                                Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(file) + " 成功");
                                Log.ftpLog(copytargetbuild + @"\" + System.IO.Path.GetFileName(file) );

                            }
                            else
                            {
                                Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(file) + " 失败");
                            };
                        }
                        

                    }

                    if (file.Contains(".swf"))
                    {
                        // string provider = "mayayl"

                        copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-debug\" + System.IO.Path.GetDirectoryName(file) + @"\" + System.IO.Path.GetFileNameWithoutExtension(file) + @"-encrypt.swf";
                        copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.mayayl + @"\" + file;
                    //    RecursiveFileSearch.hasDirectory(System.IO.Path.GetDirectoryName(copytargetbuild), true);
                        if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 成功");
                            Log.ftpLog(copytargetbuild );
                        }
                        else
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 失败");
                        };
                        // string provider = "classic"
                        string findPath = PathManager.GetInstance().findPathByfile(System.IO.Path.GetFileName(file));
                        copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\resource\fla\classic\mayal-20151210\" + findPath + @"\" + System.IO.Path.GetFileNameWithoutExtension(file) + @"-encrypt.swf";
                        copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.classic + @"\" + file;
                    //    RecursiveFileSearch.hasDirectory(System.IO.Path.GetDirectoryName(copytargetbuild), true);
                        if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 成功");
                            Log.ftpLog(copytargetbuild );
                        }
                        else
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 失败");
                        };

                        // string provider = "junbo"
                        findPath = PathManager.GetInstance().findPathByfile(System.IO.Path.GetFileName(file));
                        copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\resource\fla\classic\mayal-20151210\" + findPath + @"\" + System.IO.Path.GetFileNameWithoutExtension(file) + @"-encrypt.swf";
                        copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.junbo + @"\" + file;
                    //    RecursiveFileSearch.hasDirectory(System.IO.Path.GetDirectoryName(copytargetbuild), true);
                        if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 成功");
                            Log.ftpLog(copytargetbuild );
                        }
                        else
                        {
                            Log.trace("文件copy到 " + copytargetbuild + " 失败");
                        };
                    }
                }
            }//foreach end
            //copy 自动修改的config.json

            // string provider = "mayayl"

            copyresourcebuild = PathManager.GetInstance().ProgramPath + ModifyConfig.mayaPath + ModifyConfig.configName;
            copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.mayayl + @"\game\json";
          //  RecursiveFileSearch.hasDirectory(copytargetbuild, true);
            if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
            {
                Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) + " 成功");
                Log.ftpLog(copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) );
            }
            else
            {
                Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) + " 失败");
            };
            // string provider = "classic"
            copyresourcebuild = PathManager.GetInstance().ProgramPath + ModifyConfig.classicPath + ModifyConfig.configName;
            copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.classic + @"\game\json";
          //  RecursiveFileSearch.hasDirectory(copytargetbuild, true);
            if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
            {
                Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) + " 成功");
                Log.ftpLog(copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) );
            }
            else
            {
                Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) + " 失败");
            };

            // string provider = "junbo"
            copyresourcebuild = PathManager.GetInstance().ProgramPath + ModifyConfig.junboPath + ModifyConfig.configName;
            copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.junbo + @"\game\json";
         //   RecursiveFileSearch.hasDirectory(copytargetbuild, true);
            if (FilesAndDirsChangeManager.copyFiles(copyresourcebuild, copytargetbuild))
            {
                Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) + " 成功");
                Log.ftpLog(copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) );
            }
            else
            {
                Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) + " 失败");
            };

            //生成ftp中 版本文件Index.xml(打包文件操作和ftp 上传操作互不干扰)
            copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.mayayl;
            ModifyIndexXML.addIndexXml(copytargetbuild);
            copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.classic;
            ModifyIndexXML.addIndexXml(copytargetbuild);
            copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.junbo;
            ModifyIndexXML.addIndexXml(copytargetbuild);
        }
    
    
    
    }

}
