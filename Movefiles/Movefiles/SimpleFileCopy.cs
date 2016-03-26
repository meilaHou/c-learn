using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utils
{
    class SimpleFileCopy : utils.ISimpleFileCopy
    {
        public void simpleFileCopy()
        {
          //  string fileName = "test.txt";
           

        }
        private void copyfiles(string sourespath, string targetpath)
        {
           string sourcePath = sourespath;
           string targetPath = targetpath;

            // Use Path class to manipulate file and directory paths.
            //string sourceFile = System.IO.Path.Combine(sourcePath, fileName);
            //string destFile = System.IO.Path.Combine(targetPath, fileName);

            // To copy a folder's contents to a new location:
            // Create a new target folder, if necessary.
            if (!System.IO.Directory.Exists(targetPath))
            {
                System.IO.Directory.CreateDirectory(targetPath);
            }

            // To copy a file to another location and 
            // overwrite the destination file if it already exists.
            //System.IO.File.Copy(sourceFile, destFile, true);

            // To copy all the files in one directory to another directory.
            // Get the files in the source folder. (To recursively iterate through
            // all subfolders under the current directory, see
            // "How to: Iterate Through a Directory Tree.")
            // Note: Check for target path was performed previously
            //       in this code example.
            if (System.IO.Directory.Exists(sourcePath))
            {
                string[] files = System.IO.Directory.GetFiles(sourcePath);

                // Copy the files and overwrite destination files if they already exist.
                foreach (string s in files)
                {
                    // Use static Path methods to extract only the file name from the path.
                    fileName = System.IO.Path.GetFileName(s);
                    destFile = System.IO.Path.Combine(targetPath, fileName);
                    System.IO.File.Copy(s, destFile, true);
                }
            }
            else
            {
                Console.WriteLine("Source path does not exist!");
            }

            // Keep console window open in debug mode.
           // Console.WriteLine("Press any key to exit.");
          //  Console.ReadKey();
        }
        public void start(string sourespath, string targetpath, Func<string,string> writefilename)
        {
            traverseTree(sourespath, targetpath, writefilename);
        }
        delegate void nihao();
        private void traverseTree(string sourespath, string targetpath,Func<string,string> writefilename)
        {
            // Data structure to hold names of subfolders to be
            // examined for files.
            Stack<string> dirs = new Stack<string>(20);
            if (!System.IO.Directory.Exists(sourespath))
            {
                throw new ArgumentException();
            }
            dirs.Push(sourespath);

            while (dirs.Count > 0)
            {
                string currentDir = dirs.Pop();
                string[] subDirs;
                try
                {
                    subDirs = System.IO.Directory.GetDirectories(currentDir);
                }

                catch (UnauthorizedAccessException e)
                {
                    Console.WriteLine(e.Message);
                    continue;
                }
                catch (System.IO.DirectoryNotFoundException e)
                {
                    Console.WriteLine(e.Message);
                    continue;
                }

                string[] files = null;
                try
                {
                    files = System.IO.Directory.GetFiles(currentDir);
                }

                catch (UnauthorizedAccessException e)
                {

                    Console.WriteLine(e.Message);
                    continue;
                }

                catch (System.IO.DirectoryNotFoundException e)
                {
                    Console.WriteLine(e.Message);
                    continue;
                }
                // Perform the required action on each file here.
                // Modify this block to perform your required task.
                /*
                 读取指定文件夹并复制其中文件到另一个文件夹中;
                 */
                copyfiles(currentDir, currentDir.Replace(sourespath, targetpath));

                foreach (string file in files)
                {
                    try
                    {
                        // Perform whatever action is required in your scenario.
                        System.IO.FileInfo fi = new System.IO.FileInfo(file);
                        Console.WriteLine(@"{0}\{1}: {2}, {3}", currentDir, fi.Name, fi.Length, fi.CreationTime);
                        string nouse = writefilename(currentDir + @"\" + fi.Name + @"," + fi.Length + @"," + fi.CreationTime);
                    }
                    catch (System.IO.FileNotFoundException e)
                    {
                        // If file was deleted by a separate application
                        //  or thread since the call to TraverseTree()
                        // then just continue.
                        Console.WriteLine(e.Message);
                        continue;
                    }
                }

                // Push the subdirectories onto the stack for traversal.
                // This could also be done before handing the files.
                foreach (string str in subDirs)
                    dirs.Push(str);
            }
        }
        public void recodePath(string pathspath,string sourespath, string targetpath)
        {
            string[] lines = { sourespath, targetpath };
            System.IO.File.WriteAllLines(pathspath, lines);
        }
        public List<string> readPath(string sourespath)
        {
            string line;
            List<string> lines = new List<string>();
            System.IO.StreamReader file =
            new System.IO.StreamReader(sourespath);
            while((line = file.ReadLine()) != null)
            {
              lines.Add(line);
            }

            file.Close();
            return lines;
        }
        public string sourcePath { get; set; }

        public string targetPath { get; set; }

        public string fileName { get; set; }

        public string destFile { get; set; }
    }
}
