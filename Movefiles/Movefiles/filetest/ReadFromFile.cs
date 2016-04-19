using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utils.filetest
{
    class ReadFromFile
    {
        public ReadFromFile()
        {

        }

        public void readtest()
        {
           //读取所有
            string[] lines = System.IO.File.ReadAllLines(@"C:\Users\Public\TestFolder\WriteLines2.txt");
            //一行一行的读取
            int counter = 0;
            string line;
            System.IO.StreamReader file =
            new System.IO.StreamReader(@"c:\test.txt");
                    while ((line = file.ReadLine()) != null)
                    {
                        System.Console.WriteLine(line);
                        counter++;
                    }

                    file.Close();
        }
    }
}
