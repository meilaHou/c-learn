using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using utils.filetest;
using System.Collections;
using ConsoleApplication1;
using 部署文件;
namespace 部署文件
{
    public partial class FTPOperation : Form
    {
        private List<string> filelist;
       // private SFTPHelper SFTP;
        FileTextChangeManager write = new FileTextChangeManager();
        public FTPOperation()
        {
            InitializeComponent();
            checkLoginInfo();
            getList();
        }

        private void getList()
        {
           
            write.TxtPath = PathManager.GetInstance().FtpLogPath;
            filelist = write.readAllLine();
            for (var i = 1; i < filelist.Count;i++ )
            {
                this.filelistbox.Items.Add(filelist[i]);
            }
        }
        /// <summary>
        /// 设置全部选择或全部取消选择
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void selectAllClick(object sender, EventArgs e)
        {
            if(this.selectAllbox.Checked)
            {
                for (int j = 0; j < filelistbox.Items.Count; j++)
                    filelistbox.SetItemChecked(j, true);
            }else
            {
                for (int j = 0; j < filelistbox.Items.Count; j++)
                    filelistbox.SetItemChecked(j, false);
            }
        }

        private List<string> getAllselectedList()
        {
            List<string> templist = new List<string>();
            for (int i = 0; i < this.filelistbox.Items.Count; i++)
            {
                if (filelistbox.GetItemChecked(i))
                {
                    templist.Add(filelistbox.GetItemText(filelistbox.Items[i]));
                }
            }
            return templist;
        }
        SFTPHelper SFTP;
        //通过shell命令操作
        //private  string ssh_conn_shell(string ip, string root, string pass)
        //{
            //SFTP = new ShellHelp();

            ////连接linux成功 

            //if (!SFTP.OpenShell(ip, root, pass))
            //{

            //    log_tb.AppendText("connect fail" + "\n");
            //    this.connect_btn.Text = "连接";
            //    this.connect_btn.Enabled = true;

               

            //}
            //else
            //{
            //    log_tb.AppendText("connect ok" + "\n");

            //    writeLoginInfo();
            //    this.connect_btn.Text = "断开";
            //    this.connect_btn.Enabled = true;
            //    testftp();
            //}
        //    return "";
        //} 

        private string ssh_conn_sftp(string ip, string root, string pass)
        {
            SFTP = new SFTPHelper(host_txt.Text, this.userName_txt.Text, this.pw_txt.Text);
            SFTPHelper.traceHandler = this.Trace;
            if (!SFTP.connect())
            {

                log_tb.AppendText("connect fail" + "\n");
                this.connect_btn.Text = "连接";
                this.connect_btn.Enabled = true;
            }
            else
            {
                log_tb.AppendText("connect ok" + "\n");

                writeLoginInfo();
                this.connect_btn.Text = "断开";
                this.connect_btn.Enabled = true;
                testftp();
            }
            return "";
        }
        private void connect_btn_Click(object sender, EventArgs e)
        {
            //"find / -name aa.txt"
            //"rm -f /home/javauser/app/egame2.2/egameentrance/client/mayayl/game/json/config.json"
            

            this.connect_btn.Enabled = false;
            if (this.connect_btn.Text == "连接")
            {
                ssh_conn_sftp(host_txt.Text, this.userName_txt.Text, this.pw_txt.Text);
            }
            else
            {
                closeConnect();
                this.connect_btn.Text = "连接";
                this.connect_btn.Enabled = true;
            }
           
        }
        /// <summary>
        /// 登录成功后将登录信息记录到文本中
        /// </summary>
        private void writeLoginInfo()
        {
            userinfo.host = host_txt.Text;
            userinfo.name = this.userName_txt.Text;
            userinfo.password = this.pw_txt.Text;
            userinfo.remotePath = this.remotePath_txt.Text;
            write.TxtPath = PathManager.GetInstance().LoginINfoLog;
            if (!write.replaceLineText("username:", "username:" + userinfo.name))
            {
                write.addOneLine("username:" + userinfo.name);
            }
            if (!write.replaceLineText("password:", "password:" + userinfo.password))
            {
                write.addOneLine("password:" + userinfo.password);
            }
            if (!write.replaceLineText("host:", "host:" + userinfo.host))
            {
                write.addOneLine("host:" + userinfo.host);
            }
            if (!write.replaceLineText("reomotepath:", "reomotepath:" + userinfo.remotePath))
            {
                write.addOneLine("reomotepath:" + userinfo.remotePath);
            }
        }
        MyUserInfo userinfo = new MyUserInfo();
        /// <summary>
        /// 从记录中检索登录用户的信息;
        /// </summary>
        private void checkLoginInfo()
        {
            write.TxtPath = PathManager.GetInstance().LoginINfoLog;
            List<string> templist = write.readAllLine();
            foreach(var info in templist)
            {
                if(info.Contains("username:"))
                {
                   this.userName_txt.Text = userinfo.name = info.Replace(@"username:","");
                }
                else if (info.Contains("password:"))
                {
                   this.pw_txt.Text =  userinfo.password = info.Replace(@"password:", "");
                }
                else if (info.Contains("host:"))
                {
                    host_txt.Text = userinfo.host = info.Replace(@"host:", "");
                }
                else if (info.Contains("reomotepath:"))
                {
                    this.remotePath_txt.Text = userinfo.remotePath = info.Replace(@"reomotepath:", "");
                }
            }
        }

        private void testftp(string commands = "")
        {
            userinfo.remotePath = this.remotePath_txt.Text;
            userinfo.remotePath = userinfo.remotePath.Replace(@"\", @"/");
            
            if(commands=="")
            {
                //string command = "find " + userinfo.remotePath + "/mayayl/game/json/" + " -name " + "config.json";
                //SFTP.Shell("help");
                //SFTP.Shell(command);//执行获取命令
                //SFTP.Delete("/home/javauser/app/egame2.2/egameentrance/client/junbo/game/json/config.json");
                //SFTP.Put("F:/workspace/EGameClient6_config/build/junbo/game/json/config.json", "/home/javauser/app/egame2.2/egameentrance/client/junbo/game/json/config.json");
                // shell.Shell("dmidecode");//执行获取命令     
            }else
            {
                //SFTP.Shell(commands);
            }

            //string info = SFTP.GetAllString();//获取返回结果 
            //Console.WriteLine("=====");
            //Console.WriteLine(info);
            //Console.WriteLine("=====");
            // shell.Close();//关闭连接 
            //if (info.Contains(@"没有那个文件或目录"))
            //{
            //    this.log_tb.AppendText("远程目录路径不正确" + "\n");
            //    return;
            //}
            
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void closedHandler(object sender, FormClosedEventArgs e)
        {
            closeConnect();
            this.Dispose();
        }
        /// <summary>
        /// 关闭sftp连接
        /// </summary>
        private void closeConnect()
        {
            if (SFTP != null && SFTP.Connected)
            {
                SFTP.close();
            }
        }

        private void upload_btn_Click(object sender, EventArgs e)
        {
            if (SFTP == null || !SFTP.Connected)
            {
                log_tb.AppendText("远程服务器已经断开..." + "\n");
                return;
            }

            if (userinfo.remotePath == "")
            {
                log_tb.AppendText("远程服务器上传目录地址不存在" + "\n");
            }
            // SFTP.Delete(@"/home/javauser/app/egame2.2/egameentrance/client/mayayl/game/json/config.json"); 
            List<string> list = getAllselectedList();
            foreach (string line in list)
            {
                string temppath = System.IO.Path.GetDirectoryName(line);
                string remotepath = userinfo.remotePath + line.Replace(PathManager.GetInstance().FtpPath, "");

                //k可以是\,也可以是/;当为\时,传值的时候会存在字符串变为 \\ 的现象
                //开头一定是\开始
                //结尾文件夹+\
                //put 返回的结果不一定准确,有时客户端显示正常传递,但实际没有传入,一般是因为 \\ 的原因;
                remotepath = remotepath.Replace(@"\",@"/");
                string templine = line.Replace(@"\", @"/");
                if (SFTP.Put(templine, remotepath))
                {
                    log_tb.AppendText("上传 " + remotepath + " 成功" + "\n");
                }
                else
                {
                    log_tb.AppendText("上传 " + remotepath + " 失败" + "\n");
                };

            }
        }

        private void deleteClick(object sender, EventArgs e)
        {
            if (SFTP == null || !SFTP.Connected)
            {
                log_tb.AppendText("远程服务器已经断开..." + "\n");
                return;
            }
            List<string> list = getAllselectedList();
            foreach (string line in list)
            {
                // string temppath = System.IO.Path.GetDirectoryName(line);
                string remotepath = userinfo.remotePath + line.Replace(PathManager.GetInstance().FtpPath, "");
                string tempstr = remotepath.Replace(@"/", @"\");
                if (SFTP.Delete(tempstr))
                {
                    log_tb.AppendText("删除 " + tempstr + " 成功" + "\n");
                }
                else
                {
                    log_tb.AppendText("删除 " + tempstr + " 失败" + "\n");
                };
            }
        }

        private void get_btn_Click(object sender, EventArgs e)
        {
            if (SFTP == null || !SFTP.Connected)
            {
                log_tb.AppendText("远程服务器已经断开..." + "\n");
                return;
            }
            List<string> list = getAllselectedList();
            foreach (string line in list)
            {
                string remotepath = userinfo.remotePath + line.Replace(PathManager.GetInstance().FtpPath, "");
                string tempstr = remotepath.Replace(@"\", @"/");
                string localpath = line;//System.IO.Path.GetDirectoryName(line);
                if (SFTP.Get(tempstr, localpath))
                {
                    log_tb.AppendText("获取 " + tempstr + " 成功" + "\n");
                }
                else
                {
                    log_tb.AppendText("获取 " + tempstr + " 失败" + "\n");
                };
            }
        }

        private void comand_keydown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter) {
                testftp(this.command_txt.Text); 
            }
        }

        private  void Trace(string str)
        {
            this.log_tb.AppendText(str);
        }
        
    }
    struct MyUserInfo
    {
        public string name;
        public string password;
        public string host;

        public string remotePath { get; set; }
    }
}
