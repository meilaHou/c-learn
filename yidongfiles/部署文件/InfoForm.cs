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

namespace 部署文件
{
    public partial class InfoForm : Form
    {
        public InfoForm()
        {
            InitializeComponent();
            initText();
        }

        private void initText()
        {
           // FileTextChangeManager.GetInstance().readAllLine();
            FileTextChangeManager textmanager = new FileTextChangeManager();
            textmanager.TxtPath = PathManager.GetInstance().ShuomingPath;
            List<string> temp = textmanager.readAllLine();
            for (var i = 0; i < temp.Count; i++)
            {
                richTextBox1.AppendText(temp[i]);
                richTextBox1.AppendText("\n");
            }
        }

        private void richTextBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
