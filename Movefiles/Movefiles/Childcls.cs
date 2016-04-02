using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movefiles
{
    class Childcls:Parentcls
    {
        public override void func1(int a)
        { 
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
