OLD_COMPONENT_NAME=$1
NEW_COMPONENT_NAME=$2

BASEPATH=/Users/Cody/Documents/side-projects/destiny/src/components
SOURCE=$BASEPATH/$OLD_COMPONENT_NAME
TARGET=$BASEPATH/$NEW_COMPONENT_NAME

# Duplicate the folder for the component
cp -r $SOURCE $TARGET && echo "Duplicated source component folder";

# Rename the files inside
mv $TARGET/$OLD_COMPONENT_NAME.css $TARGET/$NEW_COMPONENT_NAME.css &&
echo "Renamed CSS file";

mv $TARGET/$OLD_COMPONENT_NAME.js $TARGET/$NEW_COMPONENT_NAME.js &&
echo "Renamed JS file";

# Update references within the files for the new component
perl -pi -w -e "s/$OLD_COMPONENT_NAME/$NEW_COMPONENT_NAME/g;" $TARGET/* &&
echo "Updated references";
