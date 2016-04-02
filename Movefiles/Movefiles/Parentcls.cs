using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movefiles
{
    class Parentcls
    {
        public virtual void func1(int a)
        {
            Console.WriteLine("parentcls func1 虚拟");
        }

        public void newtestfunc()
        {

            Console.WriteLine("parentcls newtestfunc  虚拟");

        }
        public void  overridetestfunc()
        {
            Console.WriteLine("parentcls overridetestfunc ");
        }
        
        private double seconds = 100;
        public virtual double Hours
        {
            get { return seconds / 3600; }
            set { seconds = value * 3600; }
        }
    }
}
