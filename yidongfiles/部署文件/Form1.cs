using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using 部署文件.utils;

namespace 部署文件
{
    
    public partial class Form1 : Form
    {
        private InfoForm infopanel = new InfoForm();
        private FTPOperation ftppanel = new FTPOperation();
        public Form1()
        {
            InitializeComponent();
            initPath();
            Log.textbox = this.richTextBox2;
        }

        private void initPath()
        {
            this.program_path.Text = PathManager.GetInstance().ProgramPath;
            this.ftp_path.Text = PathManager.GetInstance().FtpPath;
            this.copy_path.Text = PathManager.GetInstance().CopyPath;
            this.change_path.Text = PathManager.GetInstance().ChangePath;
            this.version_txt.Text = PathManager.GetInstance().VersionTxt;
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void helpClick(object sender, EventArgs e)
        {
            infopanel.ShowDialog();
        }

        private void startClick(object sender, EventArgs e)
        {
            if (this.program_path.Text=="")
            {
                //this.program_path.Text = PathManager.GetInstance().ProgramPath;
            }else
            {
                PathManager.GetInstance().ProgramPath = this.program_path.Text;
            }

            if (this.program_path.Text=="")
            {
                //提示program_path路径不能为空;
                MessageBox.Show("项目路径不能为空");
                return;
            }
            //
            if (this.ftp_path.Text == "")
            {
                //this.ftp_path.Text = PathManager.GetInstance().FtpPath;
            }
            else
            {
                PathManager.GetInstance().FtpPath = this.ftp_path.Text;
            }

            if (this.ftp_path.Text == "")
            {
                //提示program_path路径不能为空;
                Log.warn("ftp路径不能为空");
                return;
            }

           //
            if (this.copy_path.Text == "")
            {
                //this.copy_path.Text = PathManager.GetInstance().CopyPath;
            }
            else
            {
                PathManager.GetInstance().CopyPath = this.copy_path.Text;
            }

            if (this.copy_path.Text == "")
            {
                //提示program_path路径不能为空;
                Log.warn("copy路径不能为空");
                return;
            }
            //
            if (this.change_path.Text == "")
            {
               // this.change_path.Text = PathManager.GetInstance().ChangePath;
            }
            else
            {
                PathManager.GetInstance().ChangePath = this.change_path.Text;
            }

            if (this.change_path.Text == "")
            {
                //提示program_path路径不能为空;
                Log.warn("change路径不能为空");
                return;
            }
            //
            if (this.version_txt.Text == "")
            {
                // this.change_path.Text = PathManager.GetInstance().ChangePath;
            }
            else
            {
                PathManager.GetInstance().VersionTxt = this.version_txt.Text;
            }

            if (this.version_txt.Text == "")
            {
                //提示program_path路径不能为空;
                Log.warn("项目版本不能为空");
                return;
            }

            
            copyfiles();
            
        }
        /// <summary>
        /// 开始各种修改和文件操作
        /// 按照一定顺序执行
        /// 目标目录的文件来源都是从对应源文件中复制
        /// </summary>
        private void copyfiles()
        {
            if (this.checkgengxinBox.Checked)
            {
                modiConfig();
            }
            if (this.buildbox.Checked)
            {
                CopyFilesManger.copyFilesToProgramBuild();
            }
            if(this.createFiles_cb.Checked)
            {
                CopyFilesManger.copyToPublish();
            }
            if(this.updateftp_cb.Checked)
            {
                CopyFilesManger.copyFilesToftp();
            }
            

            Log.trace("=====修改和拷贝完毕=====");
        }
        /// <summary>
        /// 自动修改config.json
        /// </summary>
        private void modiConfig()
        {
            ModifyConfig modiconfig = new ModifyConfig();
            modiconfig.changeFilesTime();

        }

        private void richTextBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void ftpUpdateClick(object sender, EventArgs e)
        {
            if (ftppanel.IsDisposed || ftppanel == null)
            {
                ftppanel = new FTPOperation();
            }
            ftppanel.ShowDialog();
        }
        private  部署文件.utils.ZipClass zipUtils;
        private void zipUpdateClick(object sender, EventArgs e)
        {
            if (zipUtils == null)
            {
                zipUtils = new utils.ZipClass();
            }
            if (this.dabao_txt.Text == "") {
                if (MessageBox.Show("打包版本不能为空", "警告", MessageBoxButtons.OK) == DialogResult.OK)
                {
                    return;
                }
            }
            
            string sourcePath = PathManager.GetInstance().CopyPath + @"\" + this.dabao_txt.Text;
            string targetPath = PathManager.GetInstance().CopyPath + @"\" + this.dabao_txt.Text+@".zip";
           zipUtils.ZipFileFromDirectory(sourcePath, targetPath, 9);
            Log.trace(targetPath + " 创建成功");
            connectFtp(targetPath);
        }

        private void connectFtp(string localpath) {
            try {
                FTPHelper ftphelper = new FTPHelper("114.119.40.123:9981", @"/client/", "javaftp", "hQaLbEzNh6eZinouoIrv");
                if (ftphelper.Upload(localpath))
                {
                    Log.trace(localpath + " 上传成功");
                }
                else
                {
                    Log.trace(localpath + " 上传失败");
                };
            }
            catch {
                Log.trace("ftp连接失败");
            }
            
            
        }

    }
}
