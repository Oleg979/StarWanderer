var nameVocab = new Array();

var intIncr;
var intCat;

intCat = 0;
intIncr = 0;

//The data stored is pretty simple.  It works like this:
//
// The nameVocab array has sub arrays that are named lists of data.
//
//nameVocab[intCat]= new Array(); - The nameVocab Array actually holds other arrays.
//nameVocab[intCat][0]="FIRST" - This is the name of the list of data in this sub array.  The name helps the program find the data.
//nameVocab[intCat][1] = new Array() - Yep, ANOTHER array - this is the array that holds the actual data.
//nameVocab[intCat][1][intIncr++]="First thing <SECOND>" // See that <SECOND> tag?  Anything in brackets references another list.
//nameVocab[intCat][1][intIncr++]="First thing <THIRD>"
//
// Unless it's the last entry, don't forget to increment and reset the counters!
//
//intCat++
//intIncr=0

nameVocab[intCat] = new Array();
nameVocab[intCat][0] = "FIRST";
nameVocab[intCat][1] = new Array();
nameVocab[intCat][1][intIncr++] =
  "<options>\n<options>\n<options>\n<options>\n<options>";

intCat++;
intIncr = 0;
nameVocab[intCat] = new Array();
nameVocab[intCat][0] = "options";
nameVocab[intCat][1] = new Array();
nameVocab[intCat][1][intIncr++] = "<firstconsonant><apos><ending>";
nameVocab[intCat][1][intIncr++] = "<firstconsonant><apos><ending>";
nameVocab[intCat][1][intIncr++] = "<firstconsonant><apos><vowel><apos><ending>";
nameVocab[intCat][1][intIncr++] =
  "<firstconsonant><apos><vowel><apos><midletters><apos><ending>";
nameVocab[intCat][1][intIncr++] =
  "<firstconsonant><apos><vowel><apos><midletters><apos><ending>";
nameVocab[intCat][1][intIncr++] =
  "<firstconsonant><apos><vowel><apos><midletters><apos><ending>";
nameVocab[intCat][1][intIncr++] =
  "<firstvowel><apos><midletters><apos><vowel><apos><midletters><apos><ending>";

intCat++;
intIncr = 0;
nameVocab[intCat] = new Array();
nameVocab[intCat][0] = "firstvowel";
nameVocab[intCat][1] = new Array();
nameVocab[intCat][1][intIncr++] = "A";
nameVocab[intCat][1][intIncr++] = "E";
nameVocab[intCat][1][intIncr++] = "I";
nameVocab[intCat][1][intIncr++] = "I<apos>a";
nameVocab[intCat][1][intIncr++] = "O";
nameVocab[intCat][1][intIncr++] = "U";
nameVocab[intCat][1][intIncr++] = "U<apos>a";

intCat++;
intIncr = 0;
nameVocab[intCat] = new Array();
nameVocab[intCat][0] = "firstconsonant";
nameVocab[intCat][1] = new Array();
nameVocab[intCat][1][intIncr++] = "B";
nameVocab[intCat][1][intIncr++] = "B<apos>l";
nameVocab[intCat][1][intIncr++] = "B<apos>r";
nameVocab[intCat][1][intIncr++] = "D";
nameVocab[intCat][1][intIncr++] = "D<apos>r";
nameVocab[intCat][1][intIncr++] = "Ch";
nameVocab[intCat][1][intIncr++] = "F";
nameVocab[intCat][1][intIncr++] = "F<apos>l";
nameVocab[intCat][1][intIncr++] = "F<apos>r";
nameVocab[intCat][1][intIncr++] = "G";
nameVocab[intCat][1][intIncr++] = "G<apos>l";
nameVocab[intCat][1][intIncr++] = "G<apos>r";
nameVocab[intCat][1][intIncr++] = "H";
nameVocab[intCat][1][intIncr++] = "J";
nameVocab[intCat][1][intIncr++] = "K";
nameVocab[intCat][1][intIncr++] = "K<apos>h";
nameVocab[intCat][1][intIncr++] = "K<apos>l";
nameVocab[intCat][1][intIncr++] = "K<apos>r";
nameVocab[intCat][1][intIncr++] = "L";
nameVocab[intCat][1][intIncr++] = "M";
nameVocab[intCat][1][intIncr++] = "N";
nameVocab[intCat][1][intIncr++] = "P";
nameVocab[intCat][1][intIncr++] = "P<apos>l";
nameVocab[intCat][1][intIncr++] = "P<apos>r";
nameVocab[intCat][1][intIncr++] = "R";
nameVocab[intCat][1][intIncr++] = "S";
nameVocab[intCat][1][intIncr++] = "Sh";
nameVocab[intCat][1][intIncr++] = "S<apos>l";
nameVocab[intCat][1][intIncr++] = "S<apos>m";
nameVocab[intCat][1][intIncr++] = "S<apos>n";
nameVocab[intCat][1][intIncr++] = "S<apos>t";
nameVocab[intCat][1][intIncr++] = "T";
nameVocab[intCat][1][intIncr++] = "Th";
nameVocab[intCat][1][intIncr++] = "Th<apos>r";
nameVocab[intCat][1][intIncr++] = "T<apos>r";
nameVocab[intCat][1][intIncr++] = "V";
nameVocab[intCat][1][intIncr++] = "W";
nameVocab[intCat][1][intIncr++] = "X";
nameVocab[intCat][1][intIncr++] = "Y";
nameVocab[intCat][1][intIncr++] = "Z";

intCat++;
intIncr = 0;
nameVocab[intCat] = new Array();
nameVocab[intCat][0] = "vowel";
nameVocab[intCat][1] = new Array();
nameVocab[intCat][1][intIncr++] = "a";
nameVocab[intCat][1][intIncr++] = "a<apos>a";
nameVocab[intCat][1][intIncr++] = "e";
nameVocab[intCat][1][intIncr++] = "e<apos>e";
nameVocab[intCat][1][intIncr++] = "i";
nameVocab[intCat][1][intIncr++] = "o";
nameVocab[intCat][1][intIncr++] = "o<apos>o";
nameVocab[intCat][1][intIncr++] = "u";
nameVocab[intCat][1][intIncr++] = "u<apos>u";

intCat++;
intIncr = 0;
nameVocab[intCat] = new Array();
nameVocab[intCat][0] = "midletters";
nameVocab[intCat][1] = new Array();
nameVocab[intCat][1][intIncr++] = "b";
nameVocab[intCat][1][intIncr++] = "b<apos>l";
nameVocab[intCat][1][intIncr++] = "b<apos>r";
nameVocab[intCat][1][intIncr++] = "ch";
nameVocab[intCat][1][intIncr++] = "d";
nameVocab[intCat][1][intIncr++] = "d<apos>r";
nameVocab[intCat][1][intIncr++] = "f";
nameVocab[intCat][1][intIncr++] = "fr";
nameVocab[intCat][1][intIncr++] = "fl";
nameVocab[intCat][1][intIncr++] = "g";
nameVocab[intCat][1][intIncr++] = "g<apos>l";
nameVocab[intCat][1][intIncr++] = "g<apos>r";
nameVocab[intCat][1][intIncr++] = "h";
nameVocab[intCat][1][intIncr++] = "j";
nameVocab[intCat][1][intIncr++] = "k";
nameVocab[intCat][1][intIncr++] = "k<apos>l";
nameVocab[intCat][1][intIncr++] = "k<apos>s";
nameVocab[intCat][1][intIncr++] = "k<apos>r";
nameVocab[intCat][1][intIncr++] = "k<apos>t";
nameVocab[intCat][1][intIncr++] = "l";
nameVocab[intCat][1][intIncr++] = "l<apos>b";
nameVocab[intCat][1][intIncr++] = "l<apos>d";
nameVocab[intCat][1][intIncr++] = "l<apos>k";
nameVocab[intCat][1][intIncr++] = "l<apos>l";
nameVocab[intCat][1][intIncr++] = "l<apos>m";
nameVocab[intCat][1][intIncr++] = "l<apos>r";
nameVocab[intCat][1][intIncr++] = "l<apos>s";
nameVocab[intCat][1][intIncr++] = "l<apos>t";
nameVocab[intCat][1][intIncr++] = "m";
nameVocab[intCat][1][intIncr++] = "n";
nameVocab[intCat][1][intIncr++] = "n<apos>d";
nameVocab[intCat][1][intIncr++] = "n<apos>t";
nameVocab[intCat][1][intIncr++] = "p";
nameVocab[intCat][1][intIncr++] = "p<apos>k";
nameVocab[intCat][1][intIncr++] = "p<apos>l";
nameVocab[intCat][1][intIncr++] = "p<apos>r";
nameVocab[intCat][1][intIncr++] = "r";
nameVocab[intCat][1][intIncr++] = "r<apos>d";
nameVocab[intCat][1][intIncr++] = "r<apos>j";
nameVocab[intCat][1][intIncr++] = "r<apos>k";
nameVocab[intCat][1][intIncr++] = "r<apos>l";
nameVocab[intCat][1][intIncr++] = "r<apos>r";
nameVocab[intCat][1][intIncr++] = "r<apos>s";
nameVocab[intCat][1][intIncr++] = "r<apos>t";
nameVocab[intCat][1][intIncr++] = "s";
nameVocab[intCat][1][intIncr++] = "sh";
nameVocab[intCat][1][intIncr++] = "s<apos>l";
nameVocab[intCat][1][intIncr++] = "s<apos>n";
nameVocab[intCat][1][intIncr++] = "s<apos>m";
nameVocab[intCat][1][intIncr++] = "s<apos>t";
nameVocab[intCat][1][intIncr++] = "t";
nameVocab[intCat][1][intIncr++] = "th";
nameVocab[intCat][1][intIncr++] = "th<apos>r";
nameVocab[intCat][1][intIncr++] = "t<apos>r";
nameVocab[intCat][1][intIncr++] = "v";
nameVocab[intCat][1][intIncr++] = "x";
nameVocab[intCat][1][intIncr++] = "x<apos>x";
nameVocab[intCat][1][intIncr++] = "y";
nameVocab[intCat][1][intIncr++] = "z";
nameVocab[intCat][1][intIncr++] = "z<apos>g";
nameVocab[intCat][1][intIncr++] = "z<apos>l";
nameVocab[intCat][1][intIncr++] = "z<apos>n";
nameVocab[intCat][1][intIncr++] = "z<apos>m";
nameVocab[intCat][1][intIncr++] = "z<apos>t";
nameVocab[intCat][1][intIncr++] = "z<apos>z";

intCat++;
intIncr = 0;
nameVocab[intCat] = new Array();
nameVocab[intCat][0] = "ending";
nameVocab[intCat][1] = new Array();
nameVocab[intCat][1][intIncr++] = "a";
nameVocab[intCat][1][intIncr++] = "ak";
nameVocab[intCat][1][intIncr++] = "ar";
nameVocab[intCat][1][intIncr++] = "ax";
nameVocab[intCat][1][intIncr++] = "an";
nameVocab[intCat][1][intIncr++] = "e<apos>a";
nameVocab[intCat][1][intIncr++] = "e<apos>e";
nameVocab[intCat][1][intIncr++] = "ek";
nameVocab[intCat][1][intIncr++] = "i<apos>a";
nameVocab[intCat][1][intIncr++] = "ik";
nameVocab[intCat][1][intIncr++] = "in";
nameVocab[intCat][1][intIncr++] = "is";
nameVocab[intCat][1][intIncr++] = "ix";
nameVocab[intCat][1][intIncr++] = "ok";
nameVocab[intCat][1][intIncr++] = "on";
nameVocab[intCat][1][intIncr++] = "o<apos>o";
nameVocab[intCat][1][intIncr++] = "os";
nameVocab[intCat][1][intIncr++] = "ox";
nameVocab[intCat][1][intIncr++] = "oz";

intCat++;
intIncr = 0;
nameVocab[intCat] = new Array();
nameVocab[intCat][0] = "apos";
nameVocab[intCat][1] = new Array();
nameVocab[intCat][1][intIncr++] = "'";
nameVocab[intCat][1][intIncr++] = "";
nameVocab[intCat][1][intIncr++] = "";
nameVocab[intCat][1][intIncr++] = "";
nameVocab[intCat][1][intIncr++] = "";
nameVocab[intCat][1][intIncr++] = "";

//Leave to Copy!
intCat++;
intIncr = 0;
nameVocab[intCat] = new Array();
nameVocab[intCat][0] = "";
nameVocab[intCat][1] = new Array();
nameVocab[intCat][1][intIncr++] = "";

function nameGenNumber(nRange) {
  var iNumGen;
  iNumGen = Math.round(Math.random() * nRange);

  return iNumGen;
}

function nameGetFrom(aArray) {
  var undefined;
  var sReturn;
  sReturn = aArray[nameGenNumber(aArray.length)];
  if (sReturn == undefined) {
    sReturn = nameGetFrom(aArray);
  }
  return sReturn;
}

function nameGetArray(sArrayName) {
  for (var intLooper = 0; intLooper < nameVocab.length; intLooper++) {
    if (nameVocab[intLooper][0] == sArrayName) {
      return nameVocab[intLooper][1];
      break;
    }
  }
}

function nameScanLine(sLine) {
  var iTagStart, iTagEnd;
  var sKey;

  if (sLine.indexOf("<") > -1) {
    iTagStart = sLine.indexOf("<");
    iTagEnd = sLine.indexOf(">");

    sKey = sLine.substr(iTagStart + 1, iTagEnd - (iTagStart + 1));

    sKey = nameGetFrom(nameGetArray(sKey));
    sLine =
      sLine.substr(0, iTagStart) +
      sKey +
      sLine.substr(iTagEnd + 1, sLine.length - iTagEnd);
  }

  if (sLine.indexOf("<") > -1) {
    sLine = nameScanLine(sLine);
  }

  return sLine;
}

function GenName() {
  sLine = nameGetFrom(nameGetArray("FIRST"));

  sLine = nameScanLine(sLine);

  return sLine.split("\n")[0];
}
