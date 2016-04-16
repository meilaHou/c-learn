using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using utils.filetest;
namespace 部署文件
{
   
    class ModifyConfig
    {
         public static string configName = "config.json";
         public static string classicPath = @"/build/classic/game/json/";
         public static string  junboPath = @"/build/junbo/";
         public static string mayaPath = @"/build/mayayl/game/json/";
         //public static String debugPath = @"/bin-debug/game/json/";
         private WriteTextFile writefile;
        public ModifyConfig()
         {
             writefile = new WriteTextFile();
         }
        public void changeFilesTime()
         {
             List<string> templist = ChangedFilesManager.GetInstance().filePathList;
             Log.trace("=====修改config.json配置开始=====");
            List<string> templist2;
            foreach(var path in templist)
            {
                if(path.Contains("Main.swf"))
                {
                    continue;
                }
                string filename = System.IO.Path.GetFileNameWithoutExtension(path);
                string fileextension = System.IO.Path.GetExtension(path);
               // System.Console.WriteLine(System.IO.Path.GetFileName(path));
                System.Console.WriteLine(path);
                string re0 = "(\"" + filename + ")";
                string re01 = "(\\.)";
                string re02 = "(" + fileextension.Replace(".", "") + ")";
                string re03 = "(\\?t=)";
                string re1 = "(\\d+)";	// Integer Number 1
                string re2 = "(\\.*)";	// Any Single Character 1
                string re3 = "(\\d+)";	// Integer Number 2
                string re4 = "(\\.*)";	// Any Single Character 2
                string re5 = "(\\d+)";	// Integer Number 3
                string currenttime = DateTime.Now.ToString("yyMMddhhmm");
                bool isfox;
                writefile.TxtPath = PathManager.GetInstance().ProgramPath + mayaPath + configName;
                isfox = writefile.replaceLineWithReg(re0 + re01 + re02 + re03 + re1 + re2 + re3 + re4 + re5, "\"" + filename + fileextension + "?t=" + currenttime);
                Log.trace(mayaPath + "    " + filename + fileextension + " " + (isfox ? "成功" : "失败"));
                writefile.TxtPath = PathManager.GetInstance().ProgramPath + classicPath + configName;
               isfox = writefile.replaceLineWithReg(re0 + re01 + re02 + re03 + re1 + re2 + re3 + re4 + re5, "\"" + filename + fileextension + "?t=" + currenttime);
               Log.trace(classicPath + "    " + filename + fileextension + " "+(isfox ? "成功" : "失败"));
                writefile.TxtPath = PathManager.GetInstance().ProgramPath + junboPath + configName;
                isfox = writefile.replaceLineWithReg(re0 + re01 + re02 + re03 + re1 + re2 + re3 + re4 + re5, "\"" + filename + fileextension + "?t=" + currenttime);
                Log.trace(junboPath + "    " + filename + fileextension + " " + (isfox?"成功":"失败"));
                
                
            }
            
         }

    }
}
