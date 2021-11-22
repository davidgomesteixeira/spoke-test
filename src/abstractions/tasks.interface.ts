interface GetTasksInterface {
  all(query: any): any;
}

interface GetSingleTaskInterface {
  one(id: string): any;
}

export { 
  GetTasksInterface, 
  GetSingleTaskInterface 
};
