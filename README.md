# MMD Maker

MMD Maker is a script for Adobe After Effects that adds various 3D elements to your composition, such as cubes, nulls, cameras, and more. It also includes a file browser for selecting files to import into your composition.

## Installation

To install MMD Maker, simply copy the `mmd maker.jsx` file to your After Effects scripts folder. The default location for this folder is:

`C:\Program Files\Adobe\Adobe After Effects <version>\Support Files\Scripts`

Once the script is in the scripts folder, you can run it from within After Effects by going to `File > Scripts > mmd maker`.

## Usage

To use MMD Maker, simply run the script from within After Effects. This will open a panel with various buttons for adding 3D elements to your composition. You can also use the file browser to select files to import into your composition.

GitHub Copilot: Sure, here's an explanation of each functionality in the code excerpt:

### Add 3D Cube

This function adds a 3D cube to the active composition. It creates a new solid layer with the dimensions of the cube and applies the "CC Sphere" effect to it to make it look like a cube.

### Add Null

This function adds a null layer to each layer in the active composition. It sets the null layer's position to the same position as the layer it's parented to.

### Add Random Position

This function adds a random position to each layer in the active composition. It generates a random number between -50 and 50 and adds it to the x and y position of each layer.

### Add Camera

This function adds a camera layer to the active composition. It creates a new camera layer and applies the "3D Camera Controller" effect to it to allow for easy camera movement.

### Add Shake Wiggle

This function adds a wiggle expression to the position of each layer in the active composition. It generates a random number between -10 and 10 and applies it to the x and y position of each layer.

### Check Files

This function checks the files in the specified directory and updates the dropdown list with the display names of the files.

### Composite

This function composites the selected file onto the active composition. It creates a new solid layer and applies the selected file as a texture to it. It then applies the "CC Composite" effect to the layer to composite it onto the active composition.

### Add Parent Null

This function adds a null layer as a parent to the selected layer in the active composition. It sets the null layer's position to the same position as the layer it's parented to, and sets the layer's parent to the null layer.

### Add Child Null

This function adds a null layer as a child to the selected layer in the active composition. It sets the null layer's position to the same position as the layer it's parented to, and sets the null layer's parent to the selected layer.

### Add Null with Transform

This function adds a null layer to the active composition with the same transform properties as the selected layer. It sets the null layer's position, rotation, and scale to the same values as the selected layer.

## Contributing

If you find a bug or have a feature request, please open an issue on the [GitHub repository](https://github.com/aymaneallaoui/mmd-maker). Pull requests are also welcome!

## License

MMD Maker is licensed under the [MIT License](https://opensource.org/licenses/MIT). See `LICENSE` for more information.
