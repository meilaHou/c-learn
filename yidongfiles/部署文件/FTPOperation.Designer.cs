namespace 部署文件
{
    partial class FTPOperation
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.userName_txt = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.host_txt = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.pw_txt = new System.Windows.Forms.TextBox();
            this.connect_btn = new System.Windows.Forms.Button();
            this.upload_btn = new System.Windows.Forms.Button();
            this.filelistbox = new System.Windows.Forms.CheckedListBox();
            this.log_tb = new System.Windows.Forms.RichTextBox();
            this.selectAllbox = new System.Windows.Forms.CheckBox();
            this.SuspendLayout();
            // 
            // userName_txt
            // 
            this.userName_txt.Location = new System.Drawing.Point(67, 70);
            this.userName_txt.Name = "userName_txt";
            this.userName_txt.Size = new System.Drawing.Size(254, 21);
            this.userName_txt.TabIndex = 0;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(26, 73);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(35, 12);
            this.label1.TabIndex = 1;
            this.label1.Text = "账号:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(26, 46);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(35, 12);
            this.label2.TabIndex = 3;
            this.label2.Text = "host:";
            // 
            // host_txt
            // 
            this.host_txt.Location = new System.Drawing.Point(67, 43);
            this.host_txt.Name = "host_txt";
            this.host_txt.Size = new System.Drawing.Size(254, 21);
            this.host_txt.TabIndex = 2;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(26, 100);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(35, 12);
            this.label3.TabIndex = 5;
            this.label3.Text = "密码:";
            // 
            // pw_txt
            // 
            this.pw_txt.Location = new System.Drawing.Point(67, 97);
            this.pw_txt.Name = "pw_txt";
            this.pw_txt.Size = new System.Drawing.Size(254, 21);
            this.pw_txt.TabIndex = 4;
            // 
            // connect_btn
            // 
            this.connect_btn.Location = new System.Drawing.Point(517, 40);
            this.connect_btn.Name = "connect_btn";
            this.connect_btn.Size = new System.Drawing.Size(75, 23);
            this.connect_btn.TabIndex = 6;
            this.connect_btn.Text = "连接";
            this.connect_btn.UseVisualStyleBackColor = true;
            this.connect_btn.Click += new System.EventHandler(this.connect_btn_Click);
            // 
            // upload_btn
            // 
            this.upload_btn.Location = new System.Drawing.Point(517, 73);
            this.upload_btn.Name = "upload_btn";
            this.upload_btn.Size = new System.Drawing.Size(75, 23);
            this.upload_btn.TabIndex = 7;
            this.upload_btn.Text = "上传";
            this.upload_btn.UseVisualStyleBackColor = true;
            // 
            // filelistbox
            // 
            this.filelistbox.FormattingEnabled = true;
            this.filelistbox.Location = new System.Drawing.Point(12, 128);
            this.filelistbox.Name = "filelistbox";
            this.filelistbox.Size = new System.Drawing.Size(658, 180);
            this.filelistbox.TabIndex = 8;
            // 
            // log_tb
            // 
            this.log_tb.Location = new System.Drawing.Point(12, 337);
            this.log_tb.Name = "log_tb";
            this.log_tb.Size = new System.Drawing.Size(658, 223);
            this.log_tb.TabIndex = 9;
            this.log_tb.Text = "";
            // 
            // selectAllbox
            // 
            this.selectAllbox.AutoSize = true;
            this.selectAllbox.Location = new System.Drawing.Point(13, 315);
            this.selectAllbox.Name = "selectAllbox";
            this.selectAllbox.Size = new System.Drawing.Size(48, 16);
            this.selectAllbox.TabIndex = 10;
            this.selectAllbox.Text = "全选";
            this.selectAllbox.UseVisualStyleBackColor = true;
            this.selectAllbox.CheckedChanged += new System.EventHandler(this.selectAllClick);
            // 
            // FTPOperation
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(691, 572);
            this.Controls.Add(this.selectAllbox);
            this.Controls.Add(this.log_tb);
            this.Controls.Add(this.filelistbox);
            this.Controls.Add(this.upload_btn);
            this.Controls.Add(this.connect_btn);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.pw_txt);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.host_txt);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.userName_txt);
            this.Name = "FTPOperation";
            this.Text = "FTPOperation";
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.closedHandler);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox userName_txt;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox host_txt;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox pw_txt;
        private System.Windows.Forms.Button connect_btn;
        private System.Windows.Forms.Button upload_btn;
        private System.Windows.Forms.CheckedListBox filelistbox;
        private System.Windows.Forms.RichTextBox log_tb;
        private System.Windows.Forms.CheckBox selectAllbox;
    }
}