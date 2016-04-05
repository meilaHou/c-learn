using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Movefiles;
namespace utils
{
    
    class Weituo
    {
       
        public Weituo()
        {
            Childcls.p1 = new Childcls.weituoFunc(writeToScreen);
        }
        private int writeToScreen(int x)
        {
            x += 1;
            return x;
        }
    }
   
}
