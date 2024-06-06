import { Box, Grid, Typography, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout";

const lessonsResponse = {
    "data": [
        {
            "lesson": {
                "id": "92af86a9-3d10-4457-89a6-6e05838c5e08",
                "createdOn": "2024-06-06T10:24:12.169059",
                "updatedOn": "2024-06-06T10:24:12.169263",
                "updatedBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "createdBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "previousElement": null,
                "nextElements": [
                    {
                        "id": "acca8be0-327d-4133-93e0-dde15326b5f0"
                    }
                ],
                "name": "Lesson 1",
                "description": "Description of Lesson 1",
                "educator": {
                    "id": "20eef4f4-f60d-43b0-9217-3d54561ebedd",
                    "ownerUserId": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                    "type": "CONTRIBUTOR"
                }
            },
            "done": false
        },
        {
            "lesson": {
                "id": "acca8be0-327d-4133-93e0-dde15326b5f0",
                "createdOn": "2024-06-06T10:24:12.342092",
                "updatedOn": "2024-06-06T10:24:12.342426",
                "updatedBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "createdBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "previousElement": {
                    "id": "92af86a9-3d10-4457-89a6-6e05838c5e08"
                },
                "nextElements": [
                    {
                        "id": "1f74de89-6340-4bf5-8f34-6524ff43e523"
                    },
                    {
                        "id": "0893af61-177c-472a-9753-3ede64c89be4"
                    }
                ],
                "name": "Lesson2",
                "description": "Description of Lesson2",
                "educator": {
                    "id": "20eef4f4-f60d-43b0-9217-3d54561ebedd",
                    "ownerUserId": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                    "type": "CONTRIBUTOR"
                }
            },
            "done": false
        },
        {
            "lesson": {
                "id": "1f74de89-6340-4bf5-8f34-6524ff43e523",
                "createdOn": "2024-06-06T10:24:12.613711",
                "updatedOn": "2024-06-06T10:24:12.613837",
                "updatedBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "createdBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "previousElement": {
                    "id": "acca8be0-327d-4133-93e0-dde15326b5f0"
                },
                "nextElements": [],
                "name": "Lesson3",
                "description": "Description of Lesson3",
                "educator": {
                    "id": "20eef4f4-f60d-43b0-9217-3d54561ebedd",
                    "ownerUserId": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                    "type": "CONTRIBUTOR"
                }
            },
            "done": false
        },
        {
            "lesson": {
                "id": "0893af61-177c-472a-9753-3ede64c89be4",
                "createdOn": "2024-06-06T10:24:12.715275",
                "updatedOn": "2024-06-06T10:24:12.715302",
                "updatedBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "createdBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "previousElement": {
                    "id": "acca8be0-327d-4133-93e0-dde15326b5f0"
                },
                "nextElements": [
                    {
                        "id": "7835bee2-58a4-4937-baad-2c85fa0abdee"
                    }
                ],
                "name": "Lesson4",
                "description": "Description of Lesson4",
                "educator": {
                    "id": "20eef4f4-f60d-43b0-9217-3d54561ebedd",
                    "ownerUserId": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                    "type": "CONTRIBUTOR"
                }
            },
            "done": false
        },
        {
            "lesson": {
                "id": "7835bee2-58a4-4937-baad-2c85fa0abdee",
                "createdOn": "2024-06-06T10:24:12.80494",
                "updatedOn": "2024-06-06T10:24:12.804967",
                "updatedBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "createdBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "previousElement": {
                    "id": "0893af61-177c-472a-9753-3ede64c89be4"
                },
                "nextElements": [
                    {
                        "id": "223ce2cc-22f3-47a7-bdb0-01b571dc50e7"
                    },
                    {
                        "id": "89d17b29-4ddf-4d26-9410-c52537a3dbdb"
                    }
                ],
                "name": "Lesson5",
                "description": "Description of Lesson5",
                "educator": {
                    "id": "20eef4f4-f60d-43b0-9217-3d54561ebedd",
                    "ownerUserId": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                    "type": "CONTRIBUTOR"
                }
            },
            "done": false
        },
        {
            "lesson": {
                "id": "223ce2cc-22f3-47a7-bdb0-01b571dc50e7",
                "createdOn": "2024-06-06T10:24:12.894776",
                "updatedOn": "2024-06-06T10:24:12.894803",
                "updatedBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "createdBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "previousElement": {
                    "id": "7835bee2-58a4-4937-baad-2c85fa0abdee"
                },
                "nextElements": [
                    {
                        "id": "7e2171a5-baea-497d-a99b-508fc54bfc5b"
                    }
                ],
                "name": "Lesson6",
                "description": "Description of Lesson6",
                "educator": {
                    "id": "20eef4f4-f60d-43b0-9217-3d54561ebedd",
                    "ownerUserId": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                    "type": "CONTRIBUTOR"
                }
            },
            "done": false
        },
        {
            "lesson": {
                "id": "7e2171a5-baea-497d-a99b-508fc54bfc5b",
                "createdOn": "2024-06-06T10:24:13.06511",
                "updatedOn": "2024-06-06T10:24:13.065137",
                "updatedBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "createdBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "previousElement": {
                    "id": "223ce2cc-22f3-47a7-bdb0-01b571dc50e7"
                },
                "nextElements": [],
                "name": "Lesson7",
                "description": "Description of Lesson7",
                "educator": {
                    "id": "20eef4f4-f60d-43b0-9217-3d54561ebedd",
                    "ownerUserId": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                    "type": "CONTRIBUTOR"
                }
            },
            "done": false
        },
        {
            "lesson": {
                "id": "89d17b29-4ddf-4d26-9410-c52537a3dbdb",
                "createdOn": "2024-06-06T10:24:13.143924",
                "updatedOn": "2024-06-06T10:24:13.143946",
                "updatedBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "createdBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "previousElement": {
                    "id": "7835bee2-58a4-4937-baad-2c85fa0abdee"
                },
                "nextElements": [
                    {
                        "id": "c3c57725-b788-43f5-ac44-4e5937bc2663"
                    }
                ],
                "name": "Lesson8",
                "description": "Description of Lesson8",
                "educator": {
                    "id": "20eef4f4-f60d-43b0-9217-3d54561ebedd",
                    "ownerUserId": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                    "type": "CONTRIBUTOR"
                }
            },
            "done": false
        },
        {
            "lesson": {
                "id": "c3c57725-b788-43f5-ac44-4e5937bc2663",
                "createdOn": "2024-06-06T10:24:13.220789",
                "updatedOn": "2024-06-06T10:24:13.220812",
                "updatedBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "createdBy": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                "previousElement": {
                    "id": "89d17b29-4ddf-4d26-9410-c52537a3dbdb"
                },
                "nextElements": [],
                "name": "Lesson9",
                "description": "Description of Lesson9",
                "educator": {
                    "id": "20eef4f4-f60d-43b0-9217-3d54561ebedd",
                    "ownerUserId": "f80b0c13-3454-4d22-bdcb-6bdf1decbb8d",
                    "type": "CONTRIBUTOR"
                }
            },
            "done": false
        }
    ],
    "error": null,
    "success": true
}

class TreeGridInitializer {
    static getFirstLevel(data) {
        return [data.find(o => o.lesson.previousElement === null)];
    }

    static getNextLevel(prevLevel, allNodes) {
        return prevLevel.flatMap(o => o.lesson.nextElements).map(o => allNodes.find(x => x.lesson.id === o.id));
    }

    static getTreeAsArray(data) {
        let arr = [this.getFirstLevel(data)];
        let lastElemIdx = 0;
        while (arr[lastElemIdx].length !== 0) {
            lastElemIdx = arr.length - 1;
            let nextLevel = this.getNextLevel(arr[lastElemIdx], data);
            arr.push(nextLevel);
        }
        return arr;
    }
}

export default function LessonTreeView() {
    const theme = useTheme();

    let treeArr = TreeGridInitializer.getTreeAsArray(lessonsResponse.data);
    console.log(treeArr);

    return (
        <NavLayout>
            <Grid container sx={{position: "relative"}}>
                {
                    treeArr.map((treeLevel, levelIdx) =>
                        treeLevel.map((o, i) =>
                            <Grid item sm={12 / treeLevel.length} sx={{ position: "relative", border: "1px solid blue" }}>
                                <Box sx={{ padding: theme.spacing(8), display: "grid", placeItems: "center"}}>
                                    <Typography fontFamily={"Baloo"}>{o.lesson.name}</Typography>
                                </Box>
                                <Box sx={{
                                    position: "absolute", 
                                    top: 0, left: 0, 
                                    height: "100%", width: "100%", 
                                    backgroundColor: "rgba(255, 0, 0, 0.4)", 
                                    display: "grid",
                                    gridTemplateRows: "1fr 1fr",
                                    gridTemplateColumns: "1fr 1fr"
                                    }}>
                                        {/* Rendering root branch below */}
                                        { 
                                            levelIdx == 0 ? 
                                            <>
                                                <Box/>
                                                <Box/>
                                            </>
                                            :
                                            <>
                                                <Box sx={{borderRight: "1px solid black"}}/>
                                                <Box sx={{borderLeft: "1px solid black"}}/>
                                            </>
                                        }
                                        {/* Rendering children branch below */}
                                        {

                                        }
                                </Box>
                            </Grid>
                        )
                    )
                }
            </Grid>
        </NavLayout>
    )
}