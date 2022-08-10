import 'dotenv/config'
import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(title, contactID, type, availability, epicIDs) {
  try {
    const issue = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { 
          title: [
            {
              text: {
                content: title
              }
            }
          ]
        },
        Type: {
          select: {
            name: type
          }
        },
        Availability: {
          select: {
            name: availability
          }
        },
        Contact: {
          relation: [
            {
              id: contactID
            }
          ]
        },
        Epics: {
          relation: [
            {
              id: epicIDs[0]
            }, {
              id: epicIDs[1]
            }
          ]
        }
      },
      children: [
        {
          object: "block",
          heading_1: {
              rich_text: [
                  {
                      text: {
                          content: "Description"
                      }
                  }
              ]
          }
        },
        {
          object: "block",
          divider: {}
        },
        {
          object: "block",
          bulleted_list_item: {
            rich_text: [
              {
                  text: {
                      content: "Configuration"
                  }
              }
            ]
          }
        },
        {
          object: "block",
          bulleted_list_item: {
            rich_text: [
              {
                  text: {
                      content: "Impacted users"
                  }
              }
            ]
          }
        },
        // {
        //   object: "block",
        //   heading_1: {
        //       rich_text: [
        //           {
        //               text: {
        //                   content: "History from Campus"
        //               }
        //           }
        //       ]
        //   }
        // },
        // {
        //   object: "block",
        //   divider: {}
        // },
        // {
        //   object: "block",
        //   heading_1: {
        //       rich_text: [
        //           {
        //               text: {
        //                   content: "History from Network"
        //               }
        //           }
        //       ]
        //   }
        // },
        // {
        //   object: "block",
        //   divider: {}
        // }
      ]
    })
    // await notion.databases.create({
    //   parent: { page_id: issue.id },
    //   title: [
    //     {
    //         type: "text",
    //         text: {
    //             content: "History from Campus",
    //             link: null
    //         }
    //     }
    //   ],
    //   properties: {
    //     Action: {
    //       title: {}
    //     },
    //     Description: {
    //       rich_text: {}
    //     },
    //   }
    // })
    console.log(issue)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
    console.log("Failure! Entry NOT added.")
  }
}

// Contact - Alan (42 Paris Founder)
const contactID = "7e5940be128342fe96cea2ca3b2aef41"
// Epic - Exam-master
const firstEpicID = "7955fdbc7d2e482fb5a5aa998e02914f"
// Epic - Exam setup
const secondEpicID = "6503595772234645956cb9598c3884d2"

addItem("Hey Hoodie!", contactID, "Documentation", "Interrupted", [ firstEpicID, secondEpicID ])
