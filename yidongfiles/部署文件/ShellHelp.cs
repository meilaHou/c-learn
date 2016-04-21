using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tamir.SharpSsh.jsch;
using System.IO;
namespace ConsoleApplication1
{
    class ShellHelp
    {
        System.IO.MemoryStream outputstream = new MemoryStream();
        Tamir.SharpSsh.SshStream inputstream = null;
        Channel channel = null;
        Session session = null;
        /// <summary> 
        /// 命令等待标识 
        /// </summary> 
        string waitMark = "]#";
        /// <summary> 
        /// 打开连接 
        /// </summary> 
        /// <param name="host"></param> 
        /// <param name="username"></param> 
        /// <param name="pwd"></param> 
        /// <returns></returns> 
        public bool OpenShell(string host, string username, string pwd)
        {
            try
            {
                ////Redirect standard I/O to the SSH channel 
                string[] arr = host.Split(':');
                string ip = arr[0];
                int port = 22;
                if (arr.Length > 1) port = Int32.Parse(arr[1]);
                inputstream = new Tamir.SharpSsh.SshStream(ip, username, pwd);
                ///我手动加进去的方法。。为了读取输出信息 
                inputstream.set_OutputStream(outputstream);
                return inputstream != null;
            }
            catch { throw; }
        }
        /// <summary>
        /// 读取连接状态
        /// </summary>
        public bool Connected { get { return inputstream != null; } }
        //SFTP存放文件  
      
        //报错,提示put not found;
        public bool Put(string localPath, string remotePath)
        {
            String cmd = "put "+localPath+" "+remotePath;
            try
            {
                Shell(cmd);
                return true;
            }
            catch
            {
                return false;
            }
        }
        //删除SFTP文件
        public bool Delete(string remoteFile)
        {
            String cmd = "rm -f "+remoteFile;
            try
            {
                Shell(cmd);
                return true;
            }
            catch
            {
                return false;
            }
        }
        //SFTP获取文件        
        public bool Get(string remotePath, string localPath)
        {
            String cmd = "";
            try
            {
                Shell(cmd);
                return true;
            }
            catch
            {
                return false;
            }
        }
        /// <summary> 
        /// 执行命令 
        /// </summary> 
        /// <param name="cmd"></param> 
        public bool Shell(string cmd)
        {
            if (inputstream == null) return false;
            string initinfo = GetAllString();
            inputstream.Write(cmd);
            inputstream.Flush();
            string currentinfo = GetAllString();
            while (currentinfo == initinfo)
            {
                System.Threading.Thread.Sleep(100);
                currentinfo = GetAllString();
            }
            return true;
        }


        /// <summary> 
        /// 获取输出信息 
        /// </summary> 
        /// <returns></returns> 
        public string GetAllString()
        {
            string outinfo = Encoding.UTF8.GetString(outputstream.ToArray());
            //等待命令结束字符 
            while (!outinfo.Trim().EndsWith(waitMark))
            {
                System.Threading.Thread.Sleep(200);
                outinfo = Encoding.UTF8.GetString(outputstream.ToArray());
            }
            outputstream.Flush();
            return outinfo.ToString();
        }
        /// <summary> 
        /// 关闭连接 
        /// </summary> 
        public void Close()
        {
            if (inputstream != null) inputstream.Close();
        }
    }
}
