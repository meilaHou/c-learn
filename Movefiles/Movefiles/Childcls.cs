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
        public override void overridetestfunc()
        {

        }
        public new void newtestfunc()
        {
            Console.WriteLine("child1cls newtestfunc new ceshi");
        }

       
    }
}
