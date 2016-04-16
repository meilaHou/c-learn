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
using UploadFile2Sftp;
using System.Collections;
namespace 部署文件
{
    public partial class FTPOperation : Form
    {
        private List<string> filelist;
        private SFTPHelper SFTP;
        WriteTextFile write = new WriteTextFile();
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



        private void connect_btn_Click(object sender, EventArgs e)
        {
            this.connect_btn.Enabled = false;
            if (this.connect_btn.Text == "连接")
            {
                SFTP = new SFTPHelper(host_txt.Text, this.userName_txt.Text, this.pw_txt.Text);

                if (!SFTP.Connect())
                {
                    log_tb.AppendText("connect fail" + "\n");
                    this.connect_btn.Text = "连接";
                    this.connect_btn.Enabled = true;
                }
                else
                {
                    log_tb.AppendText("connect ok" + "\n");
                    userinfo.host = host_txt.Text;
                    userinfo.name = this.userName_txt.Text;
                    userinfo.password = this.pw_txt.Text;
                    writeLoginInfo(userinfo);
                    this.connect_btn.Text = "断开";
                    this.connect_btn.Enabled = true;
                    testftp();
                }
            }
            else
            {
                closeConnect();
                this.connect_btn.Text = "连接";
                this.connect_btn.Enabled = true;
            }
           
        }

        private void writeLoginInfo(UserInfo userinfos)
        {
            write.TxtPath = PathManager.GetInstance().LoginINfoLog;
            if (!write.replaceLineText("username:", "username:"+userinfos.name))
            {
                write.addOneLine("username:" + userinfos.name);
            }
            if (!write.replaceLineText("password:", "password:" + userinfos.password))
            {
                write.addOneLine("password:" + userinfos.password);
            }
            if (!write.replaceLineText("host:", "host:" + userinfos.host))
            {
                write.addOneLine("host:" + userinfos.host);
            }
        }
        UserInfo userinfo = new UserInfo();
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
            }
        }

        private void testftp()
        {
            ArrayList objList = new ArrayList();
          objList = SFTP.GetFileList(@"/home/javauser/",@"txt");
            foreach(var str in objList)
            {
                this.log_tb.AppendText(str + "\n");
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void closedHandler(object sender, FormClosedEventArgs e)
        {
            closeConnect();
        }
        /// <summary>
        /// 关闭sftp连接
        /// </summary>
        private void closeConnect()
        {
            if (SFTP!=null &&SFTP.Connected)
            {
                SFTP.Disconnect();
            }
        }
    }
    struct UserInfo
    {
        public string name;
        public string password;
        public string host;
    }
}
