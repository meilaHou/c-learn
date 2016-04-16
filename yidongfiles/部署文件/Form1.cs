using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

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
            modiConfig();

            copyfiles();
            
        }

        private void copyfiles()
        {
            CopyFilesManger.copyFilesToProgramBuild();
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
            ftppanel.ShowDialog();
        }

    }
}
