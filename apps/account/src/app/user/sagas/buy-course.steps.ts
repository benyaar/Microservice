import {BuyCourseSagaState} from "./buy-course.state";
import {UserEntity} from "../entities/user.entity";
import {CourseGetCourse} from "@microservice/contracts";
import {PurchaseState} from "@microservice/interfaces";

export class BuyCourseSagaStateStarted extends BuyCourseSagaState {

  public pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    const { course } = await this.saga.rmqService.send<CourseGetCourse.Request,CourseGetCourse.Response>(CourseGetCourse.topic, {
      id: this.saga.courseId
    })
    if(!course){
      throw new Error('Course is not found')
    }
    if(course.price == 0){
      this.saga.user.updateCourseStatus(course._id, PurchaseState.Purchased)
      return { paymentLink: null, user: this.saga.user }
    }
  }

  public checkPayment(): Promise<{ paymentLink: string; user: UserEntity }> {
    return Promise.resolve({paymentLink: "", user: undefined});
  }

  public cancel(): Promise<{ user: UserEntity }> {
    return Promise.resolve({user: undefined});
  }
}
