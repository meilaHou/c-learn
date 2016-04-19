using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using utils;
namespace Movefiles
{
    class Childcls:Parentcls
    {
        public string firstname;
        public int firstage;
        private int salary;
        public  Childcls()
            :base()
        {
            Console.WriteLine("Childcls 默认构造函数");
        }
        public Childcls(string name)
            :base()
        {

        }
        public Childcls(int weeklySalary, int numberOfWeeks)
             : this(weeklySalary * numberOfWeeks)
        {
            //salary = weeklySalary * numberOfWeeks;
        }

        public Childcls(int total)
        {
            salary = total;
        }
        public override void func1(int a)
        {
            var i = 123;
            Console.WriteLine("child1cls func1 实现");
            base.func1(a);
        }
        //基类需要是虚方法;
      //  public override void overridetestfunc()
      //  {
      //      Console.WriteLine("child1cls overridetestfunc ");
      //  }
        public new void newtestfunc()
        {
            Console.WriteLine("child1cls newtestfunc new ceshi");
        }
        //Childcls.Nested nest = new Childcls.Nested();
        public delegate int weituoFunc(int x);
        public static weituoFunc p1;
        public void testweituo()
        {
            //当某种条件达到或是得到响应后,执行回调
            if(p1==null)
            {
                Weituo weituo = new Weituo();
            }
            Console.WriteLine("委托返回:"+p1(1).ToString());
        }
       public class Nested
       {
           private Childcls parent;

           public Nested(Childcls parent)
           {
               // TODO: Complete member initialization
               this.parent = parent;
               parent.salary = 1;
           }
       }
    }
}
