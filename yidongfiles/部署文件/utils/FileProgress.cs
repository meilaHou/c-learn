using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Threading.Tasks;
using Microsoft.VisualBasic.FileIO;
namespace utils.filetest
{
    class FileProgress
    {
        public FileProgress()
        {
            
        }
        public void copy()
        {
            string sourcePath = @"C:\Users\Administrator\Desktop\testcopy\source";
            // Choose a destination for the copied files.
            string destinationPath = @"C:\Users\Administrator\Desktop\testcopy\target";

            FileSystem.CopyDirectory(sourcePath, destinationPath,
                UIOption.AllDialogs);
        }
        public void openfiled()
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.ShowDialog();
        }
    }
}
