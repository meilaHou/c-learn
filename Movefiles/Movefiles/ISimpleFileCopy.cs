using System;
namespace utils
{
    interface ISimpleFileCopy
    {
        string destFile { get; set; }
        string fileName { get; set; }
        System.Collections.Generic.List<string> readPath(string sourespath);
        void recodePath(string pathspath, string sourespath, string targetpath);
        void simpleFileCopy();
        string sourcePath { get; set; }
        void start(string sourespath, string targetpath, Func<string, string> writefilename);
        string targetPath { get; set; }
    }
}
