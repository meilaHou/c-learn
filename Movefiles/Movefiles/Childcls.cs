using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movefiles
{
    class Childcls:Parentcls
    {
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

       
    }
}
