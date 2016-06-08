using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using 部署文件;

namespace utils.filetest
{
   
    class FileTextChangeManager
    {
       // private static FileTextChangeManager instance;
        private String txtPath;

        public String TxtPath
        {
            get { return txtPath; }
            set { txtPath = value; }
        }
        public FileTextChangeManager()
        {

        }
        public FileTextChangeManager(string path)
        {
            txtPath = path;
        }
        public void writetest()
        {
            string[] lines = { "First line", "Second line", "Third line" };
            System.IO.File.WriteAllLines(@"C:\Users\Public\TestFolder\WriteLines.txt", lines);
            string text = "A class is the most powerful data type in C#. Like a structure, " +
                       "a class defines the data and behavior of the data type. ";
            System.IO.File.WriteAllText(@"C:\Users\Public\TestFolder\WriteText.txt", text);
            using (System.IO.StreamWriter file =
               new System.IO.StreamWriter(@"C:\Users\Public\TestFolder\WriteLines2.txt"))
            {
                foreach (string line in lines)
                {
                    // If the line doesn't contain the word 'Second', write the line to the file.
                    if (!line.Contains("Second"))
                    {
                        file.WriteLine(line);
                    }
                }
            }
          //可追加写入;
            using (System.IO.StreamWriter file =
           new System.IO.StreamWriter(@"C:\Users\Public\TestFolder\WriteLines2.txt", true))
            {
                file.WriteLine("Fourth line");
            }
        }   
        //public static FileTextChangeManager GetInstance()
        //{
        //    if (instance == null)
        //    {
        //        instance = new FileTextChangeManager();
        //    }
        //    return instance;
        //}
        public void delLineText(string matchStr)
        {
            List<string> strlist = readAllLine();
            using (System.IO.StreamWriter file =
              new System.IO.StreamWriter(txtPath))
            {
                foreach (string line in strlist)
                {
                    // If the line doesn't contain the word 'Second', write the line to the file.
                    if (!line.Contains(matchStr))
                    {
                        file.WriteLine(line);
                    }
                }
            }
        }
        /// <summary>
        /// 读取提供的文件的所有内容
        /// 如果不存在文件,抛出错误
        /// </summary>
        /// <returns></returns>
        public List<string> readAllLine()
        {
            List<string> strlist = new List<string>();
            int counter = 0;
            string line;
            
            try
            {
                System.IO.StreamReader file =
                            new System.IO.StreamReader(this.txtPath);
                while ((line = file.ReadLine()) != null)
                {
                    // System.Console.WriteLine(line);
                    if (line!="") strlist.Add(line);
                    counter++;
                }

                file.Close();
            }catch(System.IO.FileNotFoundException e)
            {
                Log.warn("没有找到文件:" + this.txtPath);
                Console.WriteLine(e.Message);
            }catch(System.IO.DirectoryNotFoundException e2)
            {
                Log.warn("没有找到目录:" + System.IO.Path.GetDirectoryName(this.txtPath));
                Console.WriteLine(e2.Message);
            }
            
            return strlist;
        }
        /// <summary>
        /// 查找出某一行,将关键字去除后返回
        /// 如果没有找到,返回空字符串
        /// </summary>
        /// <param name="matchstr"></param>
        /// <returns></returns>
        public string readOneLine(string matchstr)
        {
            string tempstr = "";
            string line;
            System.IO.StreamReader file =
            new System.IO.StreamReader(this.txtPath);
            while ((line = file.ReadLine()) != null)
            {
                if(line.Contains(matchstr))
                {
                    tempstr = line;
                }
            }

            file.Close();
            return tempstr.Replace(matchstr, ""); 
        }
        /// <summary>
        /// 根据提供的正则表达式替换匹配行中的某一子字符串;
        /// </summary>
        /// <param name="matchStr"></param>
        /// <param name="replaceStr"></param>
        /// <returns></returns>
        public bool replaceLineWithReg(string matchStr,string replaceStr)
        {
            bool tempbln = false;
            List<string> strlist = readAllLine();
            if (strlist.Count<=0)
            {
                return false;
            }
           using (System.IO.StreamWriter file =
            new System.IO.StreamWriter(txtPath))
            {

                Regex reg = new Regex(matchStr, RegexOptions.IgnoreCase | RegexOptions.Singleline);//  \\d+123    从左到右  匹配连续数字
               
               
                foreach (string line in strlist)
                {
                    // If the line doesn't contain the word 'Second', write the line to the file.
                    Match m = reg.Match(line);
                    if(m.Success)
                    {
                        Console.WriteLine(m.Value);
                        string templine = line.Replace(m.Value, replaceStr);
                        file.WriteLine(templine);
                        tempbln = true;
                    }
                    else
                    {
                        file.WriteLine(line);
                    }
                    
                }
                
                file.Close();
            }
           return tempbln;
        }
        /// <summary>
        /// 根据提供的匹配项,直接替换掉一整行,如果没有匹配项,则不做任何改变
        /// 默认替换的字符串中包含匹配的字符串,以供下次匹配使用
        /// </summary>
        /// <param name="matchStr"></param>
        /// <param name="replaceStr"></param>
        /// <returns></returns>
        public bool  replaceLineText(string matchStr,string replaceStr)
        {
            List<string> strlist = readAllLine();
            bool tempbln = false;
            using (System.IO.StreamWriter file =
            new System.IO.StreamWriter(txtPath))
            {
                
                foreach (string line in strlist)
                {
                    // If the line doesn't contain the word 'Second', write the line to the file.
                    if(line.Contains(matchStr))
                    {
                        file.WriteLine(replaceStr);
                        tempbln = true;
                    }
                    else
                    {
                        file.WriteLine(line);
                    }

                }
                
                file.Close();
            }
            return tempbln;
        }

        internal void addOneLine(string p)
        {
            using (System.IO.StreamWriter file =
             new System.IO.StreamWriter(txtPath,true))
            {
                file.WriteLine(p);
                file.Close();
            }
        }

        internal void clearAllLine()
        {
            using (System.IO.StreamWriter file =
             new System.IO.StreamWriter(txtPath))
            {
                file.Write("");
                file.Close();
            }
        }
    }
}
