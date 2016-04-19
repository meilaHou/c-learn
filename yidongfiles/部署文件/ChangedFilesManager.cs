using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using utils.filetest;

namespace 部署文件
{
    class ChangedFilesManager
    {
        private WriteTextFile autopathwrite;
        public static ChangedFilesManager instance;
        public List<string> filePathList;
       // private string filename = "changefile.txt";
        public ChangedFilesManager()
        {
            autopathwrite = new WriteTextFile(PathManager.GetInstance().ChangePath);
            filePathList = autopathwrite.readAllLine();
        }
        public static ChangedFilesManager GetInstance()
        {
            if(instance==null)
            {
                instance = new ChangedFilesManager();
            }
            return instance;
        }
    }
}
