using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movefiles
{
    class TestCls
    {
        public struct Person
        {
            public string Name;
            public int Age;
            public Person(string name, int age)
            {
                Name = name;
                Age = age;
            }
            public override string ToString()
            {
                return Name + Age.ToString();
            }
        }
        public void testStruct()
        {

        }
    }
}
