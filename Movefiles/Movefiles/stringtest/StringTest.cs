using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utils.stringtest
{
    class StringTest
    {
        public void testSousuo()
        {
            string str = "Extension methods have all the capabilities of regular static methods.";
            int first = str.IndexOf("methods") + "methods".Length;
            int last = str.LastIndexOf("methods");
            string str2 = str.Substring(first, last - first);
            Console.WriteLine("hello world");
        }
    }
}
