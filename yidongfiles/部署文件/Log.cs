using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using utils.filetest;
namespace 部署文件
{
    static class  Log
    {
        public static RichTextBox textbox;
        private static bool isFirstLog = true;
        private static bool isFirstFtpLog = true;
        public static void trace(string str)
        {
            if (textbox == null)
            {
                return;
            }
            textbox.AppendText(str+"\n");
            textbox.Select(textbox.Text.Length, 0);
            textbox.ScrollToCaret();  
        }

        internal static void warn(string str)
        {
            string logpath = PathManager.GetInstance().LogPath;
            WriteTextFile write = new WriteTextFile(logpath);
            if (isFirstLog)
            {
                isFirstLog = false;
                write.clearAllLine();
            }
            write.addOneLine(str);
            MessageBox.Show(str);
        }

        public static void ftpLog(string str)
        {
            string logpath = PathManager.GetInstance().FtpLogPath;
            WriteTextFile write = new WriteTextFile(logpath);
            if (isFirstFtpLog)
            {
                isFirstFtpLog = false;
                write.clearAllLine();
                write.addOneLine("以下文件需上传");
            }
            write.addOneLine(str);
        }
    }
}
