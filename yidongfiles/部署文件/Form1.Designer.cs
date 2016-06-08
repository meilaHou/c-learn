namespace 部署文件
{
    partial class Form1
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.program_path = new System.Windows.Forms.TextBox();
            this.ftp_path = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.copy_path = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.change_path = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.autocheck_cb = new System.Windows.Forms.CheckBox();
            this.start_btn = new System.Windows.Forms.Button();
            this.richTextBox2 = new System.Windows.Forms.RichTextBox();
            this.help_btn = new System.Windows.Forms.Button();
            this.label5 = new System.Windows.Forms.Label();
            this.version_txt = new System.Windows.Forms.TextBox();
            this.createFiles_cb = new System.Windows.Forms.CheckBox();
            this.updateftp_cb = new System.Windows.Forms.CheckBox();
            this.ftpUpdate_btn = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(23, 26);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(53, 12);
            this.label1.TabIndex = 0;
            this.label1.Text = "项目路径";
            // 
            // program_path
            // 
            this.program_path.Location = new System.Drawing.Point(95, 23);
            this.program_path.Name = "program_path";
            this.program_path.Size = new System.Drawing.Size(457, 21);
            this.program_path.TabIndex = 1;
            // 
            // ftp_path
            // 
            this.ftp_path.Location = new System.Drawing.Point(95, 50);
            this.ftp_path.Name = "ftp_path";
            this.ftp_path.Size = new System.Drawing.Size(457, 21);
            this.ftp_path.TabIndex = 3;
            this.ftp_path.TextChanged += new System.EventHandler(this.textBox1_TextChanged);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(23, 53);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(47, 12);
            this.label2.TabIndex = 2;
            this.label2.Text = "ftp路径";
            this.label2.Click += new System.EventHandler(this.label2_Click);
            // 
            // copy_path
            // 
            this.copy_path.Location = new System.Drawing.Point(95, 77);
            this.copy_path.Name = "copy_path";
            this.copy_path.Size = new System.Drawing.Size(457, 21);
            this.copy_path.TabIndex = 5;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(23, 80);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(53, 12);
            this.label3.TabIndex = 4;
            this.label3.Text = "copy路径";
            // 
            // change_path
            // 
            this.change_path.Location = new System.Drawing.Point(95, 107);
            this.change_path.Name = "change_path";
            this.change_path.Size = new System.Drawing.Size(457, 21);
            this.change_path.TabIndex = 7;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(23, 110);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(77, 12);
            this.label4.TabIndex = 6;
            this.label4.Text = "修改存档路径";
            // 
            // autocheck_cb
            // 
            this.autocheck_cb.AutoSize = true;
            this.autocheck_cb.Location = new System.Drawing.Point(573, 110);
            this.autocheck_cb.Name = "autocheck_cb";
            this.autocheck_cb.Size = new System.Drawing.Size(72, 16);
            this.autocheck_cb.TabIndex = 8;
            this.autocheck_cb.Text = "自动寻找";
            this.autocheck_cb.UseVisualStyleBackColor = true;
            this.autocheck_cb.Visible = false;
            // 
            // start_btn
            // 
            this.start_btn.Location = new System.Drawing.Point(677, 48);
            this.start_btn.Name = "start_btn";
            this.start_btn.Size = new System.Drawing.Size(75, 23);
            this.start_btn.TabIndex = 9;
            this.start_btn.Text = "开始";
            this.start_btn.UseVisualStyleBackColor = true;
            this.start_btn.Click += new System.EventHandler(this.startClick);
            // 
            // richTextBox2
            // 
            this.richTextBox2.Location = new System.Drawing.Point(12, 191);
            this.richTextBox2.Name = "richTextBox2";
            this.richTextBox2.ReadOnly = true;
            this.richTextBox2.Size = new System.Drawing.Size(764, 309);
            this.richTextBox2.TabIndex = 11;
            this.richTextBox2.Text = "";
            this.richTextBox2.TextChanged += new System.EventHandler(this.richTextBox2_TextChanged);
            // 
            // help_btn
            // 
            this.help_btn.Location = new System.Drawing.Point(677, 14);
            this.help_btn.Name = "help_btn";
            this.help_btn.Size = new System.Drawing.Size(75, 23);
            this.help_btn.TabIndex = 12;
            this.help_btn.Text = "帮助";
            this.help_btn.UseVisualStyleBackColor = true;
            this.help_btn.Click += new System.EventHandler(this.helpClick);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(23, 137);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(53, 12);
            this.label5.TabIndex = 13;
            this.label5.Text = "项目版本";
            // 
            // version_txt
            // 
            this.version_txt.Location = new System.Drawing.Point(95, 134);
            this.version_txt.Name = "version_txt";
            this.version_txt.Size = new System.Drawing.Size(457, 21);
            this.version_txt.TabIndex = 14;
            // 
            // createFiles_cb
            // 
            this.createFiles_cb.AutoSize = true;
            this.createFiles_cb.Location = new System.Drawing.Point(573, 82);
            this.createFiles_cb.Name = "createFiles_cb";
            this.createFiles_cb.Size = new System.Drawing.Size(96, 16);
            this.createFiles_cb.TabIndex = 15;
            this.createFiles_cb.Text = "创建打包文件";
            this.createFiles_cb.UseVisualStyleBackColor = true;
            // 
            // updateftp_cb
            // 
            this.updateftp_cb.AutoSize = true;
            this.updateftp_cb.Location = new System.Drawing.Point(573, 55);
            this.updateftp_cb.Name = "updateftp_cb";
            this.updateftp_cb.Size = new System.Drawing.Size(102, 16);
            this.updateftp_cb.TabIndex = 16;
            this.updateftp_cb.Text = "更新到ftp目录";
            this.updateftp_cb.UseVisualStyleBackColor = true;
            // 
            // ftpUpdate_btn
            // 
            this.ftpUpdate_btn.Location = new System.Drawing.Point(677, 82);
            this.ftpUpdate_btn.Name = "ftpUpdate_btn";
            this.ftpUpdate_btn.Size = new System.Drawing.Size(75, 23);
            this.ftpUpdate_btn.TabIndex = 17;
            this.ftpUpdate_btn.Text = "更新到ftp服务器";
            this.ftpUpdate_btn.UseVisualStyleBackColor = true;
            this.ftpUpdate_btn.Click += new System.EventHandler(this.ftpUpdateClick);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(788, 537);
            this.Controls.Add(this.ftpUpdate_btn);
            this.Controls.Add(this.updateftp_cb);
            this.Controls.Add(this.createFiles_cb);
            this.Controls.Add(this.version_txt);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.help_btn);
            this.Controls.Add(this.richTextBox2);
            this.Controls.Add(this.start_btn);
            this.Controls.Add(this.autocheck_cb);
            this.Controls.Add(this.change_path);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.copy_path);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.ftp_path);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.program_path);
            this.Controls.Add(this.label1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox program_path;
        private System.Windows.Forms.TextBox ftp_path;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox copy_path;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox change_path;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.CheckBox autocheck_cb;
        private System.Windows.Forms.Button start_btn;
        private System.Windows.Forms.RichTextBox richTextBox2;
        private System.Windows.Forms.Button help_btn;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.TextBox version_txt;
        private System.Windows.Forms.CheckBox createFiles_cb;
        private System.Windows.Forms.CheckBox updateftp_cb;
        private System.Windows.Forms.Button ftpUpdate_btn;
    }
}

