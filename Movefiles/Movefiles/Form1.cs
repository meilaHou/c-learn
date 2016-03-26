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
            addEvents();
        }

        private void addEvents()
        {
            this.Click += (s, e) => {
                MessageBox.Show(
                    ((MouseEventArgs)e).Location.ToString());
            };
            // Declare a single-dimensional array 
            int[] array1 = new int[5];

            // Declare and set array element values
            int[] array2 = new int[] { 1, 3, 5, 7, 9 };

            // Alternative syntax
            int[] array3 = { 1, 2, 3, 4, 5, 6 };

            // Declare a two dimensional array
            int[,,] multiDimensionalArray1 = new int[2,3,2];
            for(var i = 0;i<multiDimensionalArray1.Rank;i++)
            {

            }
            
            // Declare and set array element values
            int[,] multiDimensionalArray2 = { { 1, 2, 3 }, { 4, 5, 6 } };

            // Declare a jagged array
            int[][] jaggedArray = new int[6][];

            // Set the values of the first array in the jagged array structure
            jaggedArray[0] = new int[4] { 1, 2, 3, 4 };
            jaggedArray[1] = new int[3] { 3, 2, 3 };
            foreach(var j in jaggedArray)
            {
                System.Console.Write("{0} ", j);
            }

            PrintArray(weekDays);
            Console.WriteLine("===========");
            ChangeArrayElements(weekDays);
            PrintArray(weekDays);
            Console.WriteLine("===========");
            ChangeArray(weekDays);
            PrintArray(weekDays);
            Console.WriteLine("===========");
            testRef(ref teststr);
            Console.WriteLine(teststr);
        }
        string[] weekDays = { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" };
         void PrintArray(string[] arr)
        {
            for (int i = 0; i < arr.Length; i++)
            {
                System.Console.Write(arr[i] + "{0}", i < arr.Length - 1 ? " " : "");
            }
            System.Console.WriteLine();
        }

          void ChangeArray(string[] arr)
         {
             // The following attempt to reverse the array does not persist when
             // the method returns, because arr is a value parameter.
             arr = (arr.Reverse()).ToArray();
             // The following statement displays Sat as the first element in the array.
             System.Console.WriteLine("arr[0] is {0} in ChangeArray.", arr[0]);
         }
         void ChangeArrayElements(string[] arr)
        {
            // The following assignments change the value of individual array 
            // elements. 
            arr[0] = "111";
            arr[1] = "222";
            arr[2] = "333";
            // The following statement again displays Sat as the first element
            // in the array arr, inside the called method.
            System.Console.WriteLine("arr[0] is {0} in ChangeArrayElements.", arr[0]);
        }

         string teststr = "123456";

        void testRef(ref string str)
         {
             str = "ref gaibian";
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
