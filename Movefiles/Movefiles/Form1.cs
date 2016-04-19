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
using BaseClassEvents;
using Movefiles;
using utils.filetest;
using utils.stringtest;
namespace Movefiles
{
    public partial class form_1 : Form
    {
        public form_1()
        { 
            InitializeComponent();
           // drawPanel();

          
            temp();
        }



        //测试用方法
        private void temp()
        {
           // // 测试数组
           // TestArr testarr = new TestArr();
           // testarr.testArr();
           //// 测试虚拟方法
           // testxuni();
           // TestCls.Person person;
            //测试委托;
           // child.testweituo();
           // person.Age = 12;
           // person.Name = "good boy";
           // Console.WriteLine(person.ToString());

           // //测试扩展方法
           // string name = "1235667";
           // int intage = 12;
           // Console.WriteLine(intage.tostring());

           // //测试事件,派生类调用基类事件;
           // testevents();

            //测试异常处理
           // testexception();

            //测试循环访问目录树;
            testfiles();
        }

        private void testfiles()
        {
            //RecursiveFileSearch.testmain();
            string sourcePath = "C:/Users/Administrator/Desktop/testcopy/source";
            string targetPath = "C:/Users/Administrator/Desktop/testcopy/target";
            RecursiveFileSearch.getAllfilesName(sourcePath);
            // RecursiveFileSearch.copyFilesAndDir(sourcePath, targetPath,true);
           
            string[] patharr = {@"C:\Users\Administrator\Desktop\testcopy\source\testdir\test.txt",
                               @"C:\Users\Administrator\Desktop\testcopy\source\test.txt"};
            // RecursiveFileSearch.delFiles(patharr);
           
            //RecursiveFileSearch.copyFiles(@"C:\Users\Administrator\Desktop\testcopy\source\testdir\test.txt",
            //    @"C:\Users\Administrator\Desktop\testcopy\target\testdir\"
            //    );

            //FileProgress pgrs = new FileProgress();
            //pgrs.openfiled();
           // WriteTextFile wtest = new WriteTextFile();
           // wtest.writetest();

            testString();
        }

        private void testString()
        {
            MatchWithReg regtest = new MatchWithReg();
            regtest.testReg();
        }
        private void testexception()
        {
            ExceptionTest.test();
        }

        private void testevents()
        {
            Circle c1 = new Circle(54);
            BaseClassEvents.Rectangle r1 = new BaseClassEvents.Rectangle(12, 9);
            ShapeContainer sc = new ShapeContainer();

            // Add the shapes to the container.
            sc.AddShape(c1);
            sc.AddShape(r1);

            // Cause some events to be raised.
            c1.Update(57);
            r1.Update(7, 7);
        }

        private void testxuni()
        {
            Childcls child = new Childcls { firstname = "helloname",firstage = 123};
            Childcls.Nested nest = new Childcls.Nested(child);
            ((Parentcls)child).func1(0);
            child.newtestfunc();
            ((Parentcls)child).newtestfunc();
            child.overridetestfunc();
            ((Parentcls)child).overridetestfunc();

        }


        private async Task DoSomethingAsync()
        {
            Task<int> delayTask = DelayAsync();
            int result = await delayTask;

            // The previous two statements may be combined into
            // the following statement.
            //int result = await DelayAsync();

            Console.WriteLine("Result: " + result);
        }

        private async Task<int> DelayAsync()
        {
            await Task.Delay(1000);
            return 5;
        }












        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            Console.WriteLine();
        }

        private async void start_btn_Click(object sender, EventArgs e)
        {
             await DoSomethingAsync();
            res_text = this.res_txt.Text;
            target_text = this.target_txt.Text;
            if(nodelelete_cb.Checked)
            {

            }

            if(this.lastTime_cb.Checked)
            {

            }

            //filecopy.recodePath(paths_txt.Text,res_text, target_text);
           //if(res_text!="") filecopy.start(res_text, target_text, writefilename);
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
        //private void drawPanel()
        //{
        //    Panel temppanel = new  Panel();
        //    temppanel.Width = 100;
        //    temppanel.Name = "panel" + panelList.Count;
            
            
        //    Button tempbutton1 = new Button();
        //    tempbutton1.Location = new Point(10, 40);
        //    tempbutton1.Text = "buttonss";
        //    tempbutton1.Click += new EventHandler(start_btn_Click);

        //    temppanel.Controls.Add(tempbutton1);
        //    this.Controls.Add(temppanel);
        //    this.Controls.SetChildIndex(temppanel, 0);
        //    panelList.Add(temppanel);
        //}
        public string res_text
        {
            get;
            set;
        }
public string target_text { get; set; }
    }
}
