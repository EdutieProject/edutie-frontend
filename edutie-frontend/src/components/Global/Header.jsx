import { AppBar, Box } from '@mui/material';

function chooseVariant(variants, searchedVariant) {
  return variants.find((o)=> o.name == searchedVariant).element;
}

const headerVariants = {
  left: [
    { name: "1", element: <>variant 1</> },
    { name: "2", element: <>variant 2</> },
    { name: "3", element: <>variant 3</> },
  ],
  middle: [
    { name: "1", element: <>variant 1</> },
    { name: "2", element: <>variant 2</> },
    { name: "3", element: <>variant 3</> },
  ],
  right: [
    { name: "1", element: <>variant 1</> },
    { name: "2", element: <>variant 2</> },
    { name: "3", element: <>variant 3</> },
  ]
}

/**
 * This component was meant to be a veritcal nav. Now it is no longer used and might be deleted in the future
 * @returns JSX element 
 */
export default function Header({left, middle, right})
{
    const styles = {
      headerGeneral : {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
      },
      headerInternal: {
        p: 2
      }
    };

    let leftElement = chooseVariant(headerVariants.left, left);
    let middleElement = chooseVariant(headerVariants.middle, middle);
    let rightElement = chooseVariant(headerVariants.right, right);

    return(
        <AppBar style={styles.headerGeneral}>
          <Box sx={styles.headerInternal}>
            { leftElement ? leftElement : <></> }
          </Box>
          <Box sx={styles.headerInternal}>
            { middleElement ? middleElement : <></> }
          </Box>
          <Box sx={styles.headerInternal}>
            { rightElement ? rightElement : <></> }
          </Box>
        </AppBar>
    )
    
}