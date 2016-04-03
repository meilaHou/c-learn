using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utils
{
    public static class MehtondExtension
    {
        //public static string tostring(this string s)
        public static string tostring(this int s)
        {
            return (string.Format("Extension output: {0}", s));
        }
    }
}
