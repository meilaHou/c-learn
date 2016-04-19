using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using utils.filetest;
namespace 部署文件
{
    static class ReadmeConfig
    {
        public static string path = "";
        private static string filename = "README.md";
        private static WriteTextFile write;
        public static void addConfig(string sourcePath,string targetPath)
        {
            
            string temp ="- [替换] " + sourcePath + @"  ->  "+targetPath.Replace(@"\",@"/");
            write.addOneLine(temp);
        }
        public static void addStartTitle()
        {
            if (write == null)//工具每次启动只执行一次
            {
                write = new WriteTextFile();
            }
            addIndexXml();

            write.TxtPath = path + @"\" + filename;
            if (!RecursiveFileSearch.hasSomeFile(write.TxtPath, true))
            {
                write.addOneLine(@"## 步骤");
                Log.trace("创建文件到 " + write.TxtPath + " 成功");
            }
            else
            {
                write.addOneLine("最新记录");
            };
           
        }

        private static void addIndexXml()
        {
            if (!RecursiveFileSearch.hasSomeFile(path + @"/Index.xml", true))
            {
                write.TxtPath = path + @"/Index.xml";
                string p = @"<?xml version=""1.0"" encoding=""utf-8""?>
<index>
	<brand>
		<main>brand/Main.swf?v=1.0.01291356</main>
		<skin>brand/Skin.swf?v=1.0.01291356</skin>
	</brand>
	<app>game/Game.swf?v="+PathManager.GetInstance().VersionTxt+@"</app>
</index>";
                write.addOneLine(p);
                    
            };
        }
    }
}
