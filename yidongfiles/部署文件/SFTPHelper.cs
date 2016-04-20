using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tamir.SharpSsh;
using Tamir.SharpSsh.jsch.examples;



namespace 部署文件
{
    class SFTPHelper
    {
       public SshTransferProtocolBase sshCp;
       public delegate void traceFunc(string str);
       public static traceFunc traceHandler;
        //host:sftp地址   user：用户名   pwd：密码   
        /// <summary>
        /// 执行文件的get 和put
        /// 对于删除和查询操作,使用shellhelp
        /// </summary>
        /// <param name="host"></param>
        /// <param name="user"></param>
        /// <param name="pwd"></param>
        public SFTPHelper(string host, string user, string pwd)
        {
            string[] arr = host.Split(':');
            string ip = arr[0];//端口指定 在
            int port = 22;
            if (arr.Length > 1) port = Int32.Parse(arr[1]);

            
            if (host.Equals("scp"))
                sshCp = new Scp(ip, user);
            else
                sshCp = new Tamir.SharpSsh.Sftp(ip, user);

            if (pwd != null) sshCp.Password = pwd;
            
           // if (input.IdentityFile != null) sshCp.AddIdentityFile(input.IdentityFile);
            sshCp.OnTransferStart += new FileTransferEvent(sshCp_OnTransferStart);
            sshCp.OnTransferProgress += new FileTransferEvent(sshCp_OnTransferProgress);
            sshCp.OnTransferEnd += new FileTransferEvent(sshCp_OnTransferEnd);

            Console.Write("Connecting...");
           
        }

        

        static ConsoleProgressBar progressBar;
        public bool Connected;
        private static void sshCp_OnTransferStart(string src, string dst, int transferredBytes, int totalBytes, string message)
        {
            Console.WriteLine();
            progressBar = new ConsoleProgressBar();
           StringBuilder temp =  progressBar.Update(transferredBytes, totalBytes, message);
           traceHandler(temp.ToString());
        }

        private static void sshCp_OnTransferProgress(string src, string dst, int transferredBytes, int totalBytes, string message)
        {
            if (progressBar != null)
            {
                StringBuilder temp = progressBar.Update(transferredBytes, totalBytes, message);
               // traceHandler(temp.ToString());
            }
        }

        private static void sshCp_OnTransferEnd(string src, string dst, int transferredBytes, int totalBytes, string message)
        {
            if (progressBar != null)
            {
                StringBuilder temp = progressBar.Update(transferredBytes, totalBytes, message);
                traceHandler(temp.ToString());
                progressBar = null;
            }
        }

        internal bool Put(string p1, string p2)
        {
            if(System.IO.File.Exists(p1))
            {
                sshCp.Put(p1,p2);
                return true;//在put执行完毕后,执行这个返回
            }
            else
            {
                Log.warn(p1 + " 文件不存在");
                return false;
            }
           
        }

        internal string GetAllString()
        {
            throw new NotImplementedException();
        }

        internal bool Delete(string tempstr)
        {
            throw new NotImplementedException();
        }

        internal bool connect()
        {
            bool bln = false;
            try
            {
                sshCp.Connect();
                Console.WriteLine("OK");
                bln = true;
                
            }catch
            {
                
                bln = false;
            }
            Connected = bln;
            return bln;
        }

        public void close()
        {
            sshCp.Close();
            Connected = false;
        }
    }
}
