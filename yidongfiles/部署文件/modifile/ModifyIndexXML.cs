using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using utils.filetest;

namespace 部署文件.modifile
{
    class ModifyIndexXML
    {
        private static FileTextChangeManager write;
        public static void addIndexXml(string path)
        {
            if (write ==null) {
                write = new FileTextChangeManager();
            }
            write.TxtPath = path + @"\Index.xml";
            //"匹配 Game.swf?v=2.3.10.1601191154   "
            string re0 = "(" + "Game.swf" + ")";
            string re03 = "(\\?v=)";
            string re1 = "(\\d+)";	// Integer Number 1
            string re2 = "(\\.*)";	// Any Single Character 1
            string re3 = "(\\d+)";	// Integer Number 2
            string re4 = "(\\.*)";	// Any Single Character 2
            string re5 = "(\\d+)";	// Integer Number 3
            string re6 = "(\\.*)";	// Any Single Character 2
            string re7 = "(\\d+)";	// Integer Number 3
            ////首先清除掉所有的内容;
            //if (FilesAndDirsChangeManager.hasSomeFile(path + @"/Index.xml", false))
            //{
            //    write.clearAllLine();
            //}
            bool isfox = write.replaceLineWithReg(re0 + re03 + re1 + re2 + re3 + re4 + re5+re6+re7, "Game.swf?v=" + PathManager.GetInstance().VersionTxt);
            Log.trace(write.TxtPath  + "  Game.swf?v=" + PathManager.GetInstance().VersionTxt + " " + (isfox ? "成功" : "失败"));
            if (isfox)
            {
                Log.ftpLog(write.TxtPath);
            }
            
            //            {
//                string p = @"<?xml version=""1.0"" encoding=""utf-8""?>
//<index>
//	<brand>
//		<main>brand/Main.swf?v=1.0.01291356</main>
//		<skin>brand/Skin.swf?v=1.0.01291356</skin>
//	</brand>
//	<app>game/Game.swf?v=" + PathManager.GetInstance().VersionTxt + @"</app>
//</index>";
//                write.addOneLine(p);
//                Log.trace(write.TxtPath + " 文件创建成功");
//            };
        }
    }
}
