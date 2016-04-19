using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using utils.filetest;

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
            copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\bin-debug\";
            copytargetbuild = PathManager.GetInstance().ProgramPath + @"\build\mayayl\";
            foreach(var file in templist)
            {
                if (file.Contains("Main.swf"))
                {
                    continue;
                }
                if (RecursiveFileSearch.copyFiles(copyresourcebuild + file, copytargetbuild+System.IO.Path.GetDirectoryName(file)))
                {
                    Log.trace("文件copy到 " + copytargetbuild + file + " 成功");
                }
                else
                {
                    Log.trace("文件copy到 " + copytargetbuild + file + " 失败");
                };
            }

            //config.json在build目录中直接修改
            if (RecursiveFileSearch.copyFiles(copyresourcebuild + @"game\json\config.json", copytargetbuild + @"game\json\"))
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
            RecursiveFileSearch.hasDirectory(copytargetbuild + @"\"+createDirect, true);
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
                    if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                        RecursiveFileSearch.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect, true);
                        if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                        RecursiveFileSearch.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.mayayl, true);
                        if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                        RecursiveFileSearch.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.classic,true);
                        copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\resource\fla\classic\mayal-20151210\" +findPath+@"\"+ System.IO.Path.GetFileNameWithoutExtension(file) + @"-encrypt.swf";
                        copytargetbuild = PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.classic + @"\" + System.IO.Path.GetFileName(file);
                        if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                        RecursiveFileSearch.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.junbo, true);
                        copyresourcebuild = PathManager.GetInstance().ProgramPath + @"\resource\fla\classic\mayal-20151210\" + findPath + @"\" + System.IO.Path.GetFileNameWithoutExtension(file) + @"-encrypt.swf";
                        copytargetbuild = PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.junbo + @"\" + System.IO.Path.GetFileName(file);
                        if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
            RecursiveFileSearch.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.mayayl, true);
            if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
            RecursiveFileSearch.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.classic, true);
            if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
            RecursiveFileSearch.hasDirectory(PathManager.GetInstance().CopyPath + @"\" + createDirect + @"\" + PathManager.junbo, true);
            if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                    if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                    if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                    if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                            if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                        if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                        if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
                        if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
            }//foreach
            //copy 自动修改的config.json

            // string provider = "mayayl"

            copyresourcebuild = PathManager.GetInstance().ProgramPath + ModifyConfig.mayaPath + ModifyConfig.configName;
            copytargetbuild = PathManager.GetInstance().FtpPath + @"\" + PathManager.mayayl + @"\game\json";
          //  RecursiveFileSearch.hasDirectory(copytargetbuild, true);
            if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
            if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
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
            if (RecursiveFileSearch.copyFiles(copyresourcebuild, copytargetbuild))
            {
                Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) + " 成功");
                Log.ftpLog(copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) );
            }
            else
            {
                Log.trace("文件copy到 " + copytargetbuild + @"\" + System.IO.Path.GetFileName(copyresourcebuild) + " 失败");
            };
        }
    
    
    
    }

}
