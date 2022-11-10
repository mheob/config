package packageManager

// PackageManager structure of possible package manager
type PackageManager struct {
	Name        string
	Description string
	ShortFlag   string
	LockFile    string
}

// NPM Package Manager
var NPM = PackageManager{
	Name:        "npm",
	Description: "Use NPM as package manager",
	ShortFlag:   "n",
	LockFile:    "package-lock.json",
}

// PNPM Package Manager
var PNPM = PackageManager{
	Name:        "pnpm",
	Description: "Use PNPM as package manager",
	ShortFlag:   "p",
	LockFile:    "pnpm-lock.yaml",
}

// YARN Package Manager
var YARN = PackageManager{
	Name:        "yarn",
	Description: "Use YARN as package manager",
	ShortFlag:   "y",
	LockFile:    "yarn.lock",
}
