// C++ program to print rotated triangle pattern using
// Nested for loop

#include <iostream>
using namespace std;

// Function to print rotated triangle pattern of 2*n-1 rows
// and n columns
void printRotatedTriangle(int n)
{
	// First we print upper n rows out of the total 2*n-1
	// rows
	for (int i = 1; i <= n; i++) {

		// j iterates till i to print i number of stars
		// (*) in the (i)th row separated with one space
		for (int j = 1; j <= i; j++) {
			//Printing stars separated by one space
			cout << "*" << " ";
		}
		// line ends after printing i stars in (i)th row
		cout << endl;
	}
	// Now, we print other (n-1) rows of the triangle
	for (int i = 1; i <= n - 1; i++) {

		// j iterates till n-i to print n-i number of
		// stars (*) in the (i)th row separated with one
		// space
		for (int j = 1; j <= n - i; j++) {
			//Printing stars separated by one space
			cout << "*" << " ";
		}
		// line ends after printing n-i stars in (i)th row
		cout << endl;
	}
}

//Driver Code
int main()
{

	int n = 5;
	//Function Call
	printRotatedTriangle(n);
	return 0;
}
