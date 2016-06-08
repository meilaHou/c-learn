using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using utils.filetest;
namespace 部署文件
{
    
    public  class PathManager
    {
        private static PathManager instance;
        private string programPath;
        private string shuomingPath;

        public string ShuomingPath
        {
            get {
                if (shuomingPath == null) {
                    shuomingPath = @"./egameCopyConfig/shuoming.txt";
                }
                return shuomingPath;
            }
            set { shuomingPath = value; }
        }
        private string ftpPath;
        private string logPath;
        private string ftpLog;
        private string loginINfoLog;
        /// <summary>
        /// ftp登录的账号密码
        /// </summary>
        public string LoginINfoLog
        {
            get {
                FilesAndDirsChangeManager.hasSomeFile(@"./egameCopyConfig/ftpLoginInfo.txt", true);
                logPath = @"./egameCopyConfig/ftpLoginInfo.txt";
                loginINfoLog = logPath;
                return loginINfoLog;
            }
            set { loginINfoLog = value; }
        }
        private string versionTxt;

       /// <summary>
       /// ftp上传的日志
       /// </summary>
        public string FtpLogPath
        {
            get {
                FilesAndDirsChangeManager.hasSomeFile(@"./egameCopyConfig/ftpLog.txt", true);
                logPath = @"./egameCopyConfig/ftpLog.txt";
                ftpLog = logPath;
                return logPath;
            }
            set {  }
        }
        public const string swfPath = @"/game/resource/global/zh_cn/";
        public string LogPath
        {
            get {
                FilesAndDirsChangeManager.hasSomeFile(@"./egameCopyConfig/log.txt", true);
                logPath = @"./egameCopyConfig/log.txt";
                return logPath;
            }
            set { }
        }
        private FileTextChangeManager autopathwrite;
        public  const string classic = "classic";
        public  const string junbo = "junbo";
        public  const string mayayl = "mayayl";

        public static string[] gongying = { "mayayl", "classic", "junbo"};
        public string FtpPath
        {
            get
            {
                if (ftpPath == "" || ftpPath == null)
                {
                    ftpPath = autopathwrite.readOneLine("ftpPath:");
                }
                return ftpPath;
            }
            set
            {
                ftpPath = value;
                hasautopathFile();
                if (!autopathwrite.replaceLineText("ftpPath:", "ftpPath:" + ftpPath))
                {
                    autopathwrite.addOneLine("ftpPath:" + ftpPath);
                }
            }
        }
        private string copyPath;

        public string CopyPath
        {
            get
            {
                if (copyPath == "" || copyPath == null)
                {
                    copyPath = autopathwrite.readOneLine("copyPath:");
                }
                return copyPath;
            }
            set
            {
                copyPath = value;
                hasautopathFile();
                if (!autopathwrite.replaceLineText("copyPath:", "copyPath:" + copyPath))
                {
                    autopathwrite.addOneLine("copyPath:" + copyPath);
                }
            }
        }
        private string changePath;

        public string ChangePath
        {
            get
            {
                if (changePath == "" || changePath == null)
                {
                    changePath = autopathwrite.readOneLine("changePath:");
                }
                return changePath;
            }
            set
            {
                changePath = value;
                hasautopathFile();
                if (!autopathwrite.replaceLineText("changePath:", "changePath:" + changePath))
                {
                    autopathwrite.addOneLine("changePath:" + changePath);
                }
            }
        }

        public string VersionTxt
        {
            get {
                if (versionTxt == "" || versionTxt == null)
                {
                    versionTxt = autopathwrite.readOneLine("versionTxt:");
                }
                return versionTxt;
            }
            set { versionTxt = value;
            hasautopathFile();
            if (!autopathwrite.replaceLineText("versionTxt:", "versionTxt:" + versionTxt))
            {
                autopathwrite.addOneLine("versionTxt:" + versionTxt);
            }
            }
        }


        private string[] pathArr = new string[4];

        public PathManager()
        {
            hasautopathFile();
        }

        private void hasautopathFile()
        {
            if (autopathwrite==null)
            {
                autopathwrite = new FileTextChangeManager(@"./egameCopyConfig/autopath.txt");
            }
            FilesAndDirsChangeManager.hasSomeFile(@"./egameCopyConfig/autopath.txt", true);

        }
        public string ProgramPath
        {
            get {
                if (programPath == "" || programPath == null)
                {
                   programPath = autopathwrite.readOneLine("programPath:");
                }
                return programPath;
            }
            set
            {
                programPath = value;
                hasautopathFile();
                if (!autopathwrite.replaceLineText("programPath:", "programPath:" + programPath))
                {
                    autopathwrite.addOneLine("programPath:" + programPath);
                }
            }
        }
        /// <summary>
        /// 根据项目的特殊约定做文件位置定位;
        /// 为classic 和junbo 提供加密的swf的子目录
        /// </summary>
        /// <param name="filename"></param>
        /// <returns></returns>
        public string findPathByfile(string filename)
        {
            string tempstr = "";
            if (filename.Contains("Loading"))
            {
                tempstr = filename.Replace("Loading.swf","");
            }else if(filename.Contains("Skin"))
            {
                tempstr = filename.Replace("Skin.swf", "");
            }
            else if (filename.Contains("ommon"))
            {
                tempstr = @"common";
            }
            else if (filename.Contains("dealer"))//针对game\plugin\dealer\dealer*.swf做的处理
            {
                tempstr = @"plugin/" + System.IO.Path.GetFileNameWithoutExtension(filename);
            }
            return tempstr;
        }
        public static PathManager GetInstance()
        {
            if (instance == null)
            {
                instance = new PathManager();
            }
            return instance;
        }
    }
}
