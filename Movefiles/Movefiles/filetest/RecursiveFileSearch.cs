using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utils.filetest
{

    public class RecursiveFileSearch
    {
        static System.Collections.Specialized.StringCollection log = new System.Collections.Specialized.StringCollection();
        public static string currentDirPath;

        /// <summary>
        /// 获取磁盘的信息,并遍历所有的磁盘;
        /// </summary>
        public static void testmain()
        {

            // Start with drives if you have to search the entire computer.
            string[] drives = System.Environment.GetLogicalDrives();

            foreach (string dr in drives)
            {
                System.IO.DriveInfo di = new System.IO.DriveInfo(dr);

                // Here we skip the drive if it is not ready to be read. This
                // is not necessarily the appropriate action in all scenarios.
                if (!di.IsReady)
                {
                    Console.WriteLine("The drive {0} could not be read", di.Name);
                    continue;
                }
                System.IO.DirectoryInfo rootDir = di.RootDirectory;
                WalkDirectoryTree(rootDir);
            }

            // Write out all the files that could not be processed.
            Console.WriteLine("Files with restricted access:");
            foreach (string s in log)
            {
                Console.WriteLine(s);
            }
        }
        /// <summary>
        /// 传入某文件夹,复制里面的文件
        /// </summary>
        /// <param name="path">路径</param>
        public static void getAllfilesName(string path)
        {
            currentDirPath = path;
            System.IO.DirectoryInfo rootDir = new System.IO.DirectoryInfo(path);
            WalkDirectoryTree(rootDir);

            //string temppath = System.IO.Path.Combine(rootDir.FullName, "testdir");
            //hasDirectory(temppath, true);
            //hasSomeFile(System.IO.Path.Combine(rootDir.FullName, "test.txt"), true);
        }
        /// <summary>
        /// 获取目录下的所有文件;
        /// </summary>
        /// <param name="root"></param>
        static void WalkDirectoryTree(System.IO.DirectoryInfo root)
        {
            System.IO.FileInfo[] files = null;
            System.IO.DirectoryInfo[] subDirs = null;

            try
            {
                files = root.GetFiles("*.*");
            }

            catch (UnauthorizedAccessException e)
            {
                log.Add(e.Message);
            }

            catch (System.IO.DirectoryNotFoundException e)
            {
                Console.WriteLine(e.Message);
            }

            if (files != null)
            {
                foreach (System.IO.FileInfo fi in files)
                {
                    Console.WriteLine(fi.FullName);
                }

                // 获取当前目录下 的目录和文件,是分开获取的;
                subDirs = root.GetDirectories();
                
                foreach (System.IO.DirectoryInfo dirInfo in subDirs)
                {
                    WalkDirectoryTree(dirInfo);
                }
            }
        }
        /// <summary>
        /// 判断是否存在某目录,是否创建
        /// 文件夹
        /// 保留---保留 isCreate = true;
        /// 删除---删除(指原有的)
        /// 文件
        /// 保留---删除 isCreate = true;
        /// 删除---删除
        /// </summary>
        /// <param name="path"></param>
        /// <param name="isCreate"></param>
        /// <returns></returns>
        public static Boolean hasDirectory(string path,bool isCreate)
        {
            var boolens = false;
            if (!System.IO.Directory.Exists(path))
            {
                boolens = true;
                if (isCreate)
                {
                    System.IO.Directory.CreateDirectory(path);
                }
            }
           // System.IO.Directory.SetCurrentDirectory(@"C:\Users\Public\TestFolder\");
            return boolens;
        }
        /// <summary>
        /// 判断是否存在某文件,是否创建
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="isCreate"></param>
        /// <returns></returns>
        public static Boolean hasSomeFile(string filePath,bool isCreate)
        {
            var boolens = false;
            if (!System.IO.File.Exists(filePath))
            {
                boolens = true;
                if (isCreate)
                {
                   System.IO.FileStream fs =  System.IO.File.Create(filePath);
                }
            }
            // System.IO.Directory.SetCurrentDirectory(@"C:\Users\Public\TestFolder\");
            return boolens;
        }
        /// <summary>
        /// 将指定目录下的文件复制到另一指定目录中;
        /// 文件和目录用覆盖方式;
        /// </summary>
        /// <param name="sourcePath"></param>
        /// <param name="targetPath"></param>
        public static void copyFilesAndDir(string sourcePath,string targetPath,bool isMove = false)
        {
            //如果指定目标目录不存在,首先创建
            hasDirectory(targetPath, true);

            //遍历查找目录下的所有文件
            if (System.IO.Directory.Exists(sourcePath))
            {
                string[] files = System.IO.Directory.GetFiles(sourcePath);

                
                foreach (string s in files)
                {
                    copyFiles(s, targetPath, isMove);
                }
            }
            else
            {
                Console.WriteLine("Source path does not exist!");
            }

            // 获取当前目录下 的目录和文件,是分开获取的;
            System.IO.DirectoryInfo root = new System.IO.DirectoryInfo(sourcePath);
           System.IO.DirectoryInfo[] subDirs = root.GetDirectories();

            //文件夹的复制和移动
            foreach (System.IO.DirectoryInfo dirInfo in subDirs)
            {

                copyFilesAndDir(dirInfo.FullName, System.IO.Path.Combine(targetPath, dirInfo.Name));

                if(isMove)
                {
                    //
                    try
                    {
                       // System.IO.DirectoryInfo temp = new System.IO.DirectoryInfo(System.IO.Path.Combine(targetPath, dirInfo.Name));
                       //if(temp.Exists) {
                       //    temp.Delete(true);
                       // }
                        //首先删除目标中相同的文件夹
                        if (System.IO.Directory.Exists(System.IO.Path.Combine(targetPath, dirInfo.Name)))
                        {
                            System.IO.Directory.Delete(System.IO.Path.Combine(targetPath, dirInfo.Name),true);
                        }
                        //然后移动
                    dirInfo.MoveTo(System.IO.Path.Combine(targetPath, dirInfo.Name));
                    }catch(System.IO.IOException e)
                    {
                        Console.WriteLine(e.Message);
                        Console.WriteLine("文件夹已存在或不能被删除");
                    }
                }
                else
                {
                    //如果是复制操作,那么转换为文件的操作;
                    copyFilesAndDir(dirInfo.FullName, System.IO.Path.Combine(targetPath, dirInfo.Name),isMove);
                }
                
            }
        }
        /// <summary>
        /// 根据提供的文件路径copy或move文件
        /// </summary>
        /// <param name="pathArr"></param>
        /// <param name="isMove"></param>
        public static void copyFiles(string sourcePath, string targetPath, bool isMove = false)
        {

            if (!isMove)
            {
                try
                {
                    hasDirectory(targetPath, true);
                    string fileName = System.IO.Path.GetFileName(sourcePath);
                    string destFile = System.IO.Path.Combine(targetPath, fileName);
                    System.IO.File.Copy(sourcePath, destFile, true);
                    
                }catch(System.IO.DirectoryNotFoundException e)
                {
                    Console.WriteLine(e.Message);
                }
            }
            else
            {
                try
                {
                    if (System.IO.File.Exists(targetPath))
                    {
                        System.IO.File.Delete(targetPath);
                    }
                    System.IO.File.Move(sourcePath, targetPath);
                }
                catch (System.IO.IOException e)
                {
                    Console.WriteLine(e.Message);
                    Console.WriteLine("文件已存在或不能被删除");
                }
            }
        }
        /// <summary>
        /// 删除指定的文件
        /// </summary>
        /// <param name="pathArr"></param>
        public static void delFiles(string[] pathArr)
        {
            for(var i = 0;i<pathArr.Length;i++)
            {
                if (System.IO.File.Exists(pathArr[i]))
                {
                    try
                    {
                        System.IO.File.Delete(pathArr[i]);
                    }
                    catch (System.IO.IOException e)
                    {
                        Console.WriteLine(e.Message);
                        return;
                    }
                }
            }
        }
    }
}
