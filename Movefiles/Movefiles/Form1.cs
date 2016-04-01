using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using utils;
namespace Movefiles
{
    public partial class form_1 : Form
    {
        public form_1()
        {
            InitializeComponent();
            List<string> paths = filecopy.readPath(paths_txt.Text);
            for(int i  = 0;i<paths.Count;i++)
            {
                if(i%2==0)
                {
                    this.res_txt.Text = paths[i];
                }
                else
                {
                    this.target_txt.Text = paths[i];
                }
            }
            drawPanel();
           // testArr();
            TestArr testarr = new TestArr();
            testarr.testArr();
            temp();
        }

        private void temp()
        {
            TestCls.Person person;
            person.Age = 12;
            person.Name = "good boy";
            Console.WriteLine(person.ToString());
        }

       


       

        

























        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            Console.WriteLine();
        }

        SimpleFileCopy filecopy = new SimpleFileCopy();
        private void start_btn_Click(object sender, EventArgs e)
        {
            
            res_text = this.res_txt.Text;
            target_text = this.target_txt.Text;
            if(nodelelete_cb.Checked)
            {

            }

            if(this.lastTime_cb.Checked)
            {

            }

           // filecopy.recodePath(paths_txt.Text,res_text, target_text);
            filecopy.start(res_text, target_text, writefilename);
        }
        private string writefilename(string pasth)
        {
            result_txt.AppendText(pasth);
            return "";
        }
        private void form_1_Load(object sender, EventArgs e)
        {

        }
         List<Panel> panelList = new List<Panel>();
        private void drawPanel()
        {
            Panel temppanel = new  Panel();
            temppanel.Width = 100;
            temppanel.Name = "panel" + panelList.Count;
            
            
            Button tempbutton1 = new Button();
            tempbutton1.Location = new Point(10, 40);
            tempbutton1.Text = "buttonss";
            tempbutton1.Click += new EventHandler(start_btn_Click);

            temppanel.Controls.Add(tempbutton1);
            this.Controls.Add(temppanel);
            this.Controls.SetChildIndex(temppanel, 0);
            panelList.Add(temppanel);
        }
        public string res_text
        {
            get;
            set;
        }
public string target_text { get; set; }
    }
}
