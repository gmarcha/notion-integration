import 'dotenv/config'
import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const tasksDbId = process.env.NOTION_TASKS_DB_ID
const onboardingTasksDbId = process.env.NOTION_ONBOARDING_TASKS_DB_ID

async function addTask(title, campusPageID, epicPageID, priority, index) {
  try {
    const issue = await notion.pages.create({
      parent: { database_id: tasksDbId },
      properties: {
        Task: { 
          title: [
            {
              text: {
                content: title
              }
            }
          ]
        },
        Priority: {
          select: {
            name: priority
          }
        },
        Index: {
          number: index
        },
        Campus: {
          relation: [
            {
              id: campusPageID
            }
          ]
        },
        Epics: {
          relation: [
            {
              id: epicPageID
            }
          ]
        }
      },
      // children: [
      //   {
      //     object: "block",
      //     heading_1: {
      //         rich_text: [
      //             {
      //                 text: {
      //                     content: "Description"
      //                 }
      //             }
      //         ]
      //     }
      //   },
      //   {
      //     object: "block",
      //     divider: {}
      //   },
      //   {
      //     object: "block",
      //     bulleted_list_item: {
      //       rich_text: [
      //         {
      //             text: {
      //                 content: "Configuration"
      //             }
      //         }
      //       ]
      //     }
      //   },
      //   {
      //     object: "block",
      //     bulleted_list_item: {
      //       rich_text: [
      //         {
      //             text: {
      //                 content: "Impacted users"
      //             }
      //         }
      //       ]
      //     }
      //   },
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
      // ]
    })
    console.log(issue)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
    console.log("Failure! Entry NOT added.")
  }
}

const onboardingEpicPageID = "48072cbfad234cf68ad20f61beb82858"

const tasksArray = [
  "Book the domain name",
  "Give access to Gandi",
  "Give info about which mails have to be configured",
  "Configure the mails on Gandi",
  "Create account on the Intranet",
  "Set up site admission",
  "Create the campus group on keycloack",
  "Create account on keycloak",
  "Connect to keycloack though the mail",
  "Communicate how to log in the admission site",
  "Connect to the admission site",
  "Giving access to the Knowledge Base",
  "Start configuring the admission platform",
]

const args = process.argv.slice(2);
const campusPageID = args[0];

const res = await notion.databases.query({ database_id: onboardingTasksDbId })

res.results.forEach(async (task) => {
  const res = await notion.pages.properties.retrieve({ page_id: task.id, property_id: 'title' })
  console.log(res.results[0].title.text.content)
})

// tasksArray.forEach((taskName, i) => {
//   addTask(taskName, campusPageID, onboardingEpicPageID, "P1", i+1)
// })
