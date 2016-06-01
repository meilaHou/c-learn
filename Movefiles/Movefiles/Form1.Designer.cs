namespace Movefiles
{
    partial class form_1
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
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.start_btn = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.label1 = new System.Windows.Forms.Label();
            this.add_btn = new System.Windows.Forms.Button();
            this.paths_txt = new System.Windows.Forms.TextBox();
            this.res_txt = new System.Windows.Forms.TextBox();
            this.target_txt = new System.Windows.Forms.TextBox();
            this.nodelelete_cb = new System.Windows.Forms.CheckBox();
            this.lastTime_cb = new System.Windows.Forms.CheckBox();
            this.result_txt = new System.Windows.Forms.TextBox();
            this.groupBox1.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.result_txt);
            this.groupBox1.Controls.Add(this.lastTime_cb);
            this.groupBox1.Controls.Add(this.nodelelete_cb);
            this.groupBox1.Controls.Add(this.target_txt);
            this.groupBox1.Controls.Add(this.start_btn);
            this.groupBox1.Controls.Add(this.res_txt);
            this.groupBox1.Location = new System.Drawing.Point(3, 3);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(629, 97);
            this.groupBox1.TabIndex = 1;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "group";
            // 
            // start_btn
            // 
            this.start_btn.Location = new System.Drawing.Point(257, 39);
            this.start_btn.Name = "start_btn";
            this.start_btn.Size = new System.Drawing.Size(75, 23);
            this.start_btn.TabIndex = 1;
            this.start_btn.Text = "开始复制";
            this.start_btn.UseVisualStyleBackColor = true;
            this.start_btn.Click += new System.EventHandler(this.start_btn_Click);
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.groupBox1);
            this.panel1.Location = new System.Drawing.Point(6, 48);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(635, 109);
            this.panel1.TabIndex = 8;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(487, 15);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(113, 12);
            this.label1.TabIndex = 7;
            this.label1.Text = "(目录配置文本路径)";
            // 
            // add_btn
            // 
            this.add_btn.Location = new System.Drawing.Point(18, 13);
            this.add_btn.Name = "add_btn";
            this.add_btn.Size = new System.Drawing.Size(75, 23);
            this.add_btn.TabIndex = 2;
            this.add_btn.Text = "添加条目";
            this.add_btn.UseVisualStyleBackColor = true;
            // 
            // paths_txt
            // 
            this.paths_txt.Location = new System.Drawing.Point(99, 12);
            this.paths_txt.Multiline = true;
            this.paths_txt.Name = "paths_txt";
            this.paths_txt.Size = new System.Drawing.Size(382, 30);
            this.paths_txt.TabIndex = 6;
            this.paths_txt.Text = "C:\\Users\\Administrator\\Desktop\\testcopy\\path.txt";
            // 
            // res_txt
            // 
            this.res_txt.Location = new System.Drawing.Point(6, 19);
            this.res_txt.Multiline = true;
            this.res_txt.Name = "res_txt";
            this.res_txt.Size = new System.Drawing.Size(241, 33);
            this.res_txt.TabIndex = 0;
            // 
            // target_txt
            // 
            this.target_txt.Location = new System.Drawing.Point(6, 58);
            this.target_txt.Multiline = true;
            this.target_txt.Name = "target_txt";
            this.target_txt.Size = new System.Drawing.Size(241, 33);
            this.target_txt.TabIndex = 2;
            // 
            // nodelelete_cb
            // 
            this.nodelelete_cb.AutoSize = true;
            this.nodelelete_cb.Location = new System.Drawing.Point(559, 22);
            this.nodelelete_cb.Name = "nodelelete_cb";
            this.nodelelete_cb.Size = new System.Drawing.Size(60, 16);
            this.nodelelete_cb.TabIndex = 3;
            this.nodelelete_cb.Text = "不删除";
            this.nodelelete_cb.UseVisualStyleBackColor = true;
            // 
            // lastTime_cb
            // 
            this.lastTime_cb.AutoSize = true;
            this.lastTime_cb.Location = new System.Drawing.Point(559, 41);
            this.lastTime_cb.Name = "lastTime_cb";
            this.lastTime_cb.Size = new System.Drawing.Size(72, 16);
            this.lastTime_cb.TabIndex = 5;
            this.lastTime_cb.Text = "最新生成";
            this.lastTime_cb.UseVisualStyleBackColor = true;
            // 
            // result_txt
            // 
            this.result_txt.Location = new System.Drawing.Point(338, 19);
            this.result_txt.Multiline = true;
            this.result_txt.Name = "result_txt";
            this.result_txt.Size = new System.Drawing.Size(215, 72);
            this.result_txt.TabIndex = 6;
            // 
            // form_1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(653, 429);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.paths_txt);
            this.Controls.Add(this.add_btn);
            this.Name = "form_1";
            this.Text = "项目移动工具";
            this.Load += new System.EventHandler(this.form_1_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button start_btn;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.TextBox result_txt;
        private System.Windows.Forms.CheckBox lastTime_cb;
        public System.Windows.Forms.CheckBox nodelelete_cb;
        private System.Windows.Forms.TextBox target_txt;
        private System.Windows.Forms.TextBox res_txt;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button add_btn;
        private System.Windows.Forms.TextBox paths_txt;
    }
}

