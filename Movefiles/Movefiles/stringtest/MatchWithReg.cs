using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace utils.stringtest
{
    class MatchWithReg
    {
        public void testReg()
        {
            string re1 = "(BlackJackLoading)";	// Variable Name 1
            string re2="(\\.)";	// Any Single Character 1
            string re3="(swf)";	// Word 1
            string regstring = re1 + re2 + re3 + "(\\?t=)" + "(\\d+)(\\.*)(\\d+)(\\.*)(\\d+)";
            string txt =@"               {""id"":""BlackJack"", ""loading"":""BlackJackLoading.swf?t=1510141751"", ""skin"":""BlackJackSkin.swf?t=1510141751""},";
            Regex r = new Regex(regstring, RegexOptions.IgnoreCase | RegexOptions.Singleline);
            Match m = r.Match(txt);
            if (m.Success)
            {
                String var1 = m.Groups[1].ToString();
                String word1 = m.Groups[2].ToString();
                Console.Write("(" + var1.ToString() + ")" + "(" + word1.ToString() + ")" + "\n");
            }
        }
    }
}
