export interface Response {
    message: string,
    code: number,
    data?: any
}

export interface DevbookUser {
      id: string,
      name: string,
      email: string,
      bio: string,
      currentJob: string,
      currentCompany: string,
      previousCompany: string,
      education: string,
      likes: number,
      ratings: string,
      skills: DevbookUserWebsites[],
      websites: DevbookUserSkills[],
      images: DevbookUserImages[],
      comments: DevbookUserComments[]
}

export interface DevbookUserWebsites {
  name: string,
  url: string
}

export interface DevbookUserSkills {
  name: string,
  rating: string
}

export interface DevbookUserImages {
  name: string,
  description: string
}

export interface DevbookUserComments {
  email: string, // of the user
  id: string, // of the commenter
  name: string, // of the commenter
  text: string // of the comment
}

export interface LoginFormDetails {
  username: string,
  password: string
}

export interface CurrentUserLiked {
  userEmail: string,
  userLike: number,
  currentUserEmail: string
}

export interface CurrentUserRated {
  userEmail: string,
  currentUserEmail: string,
  ratingGiven: string
}
