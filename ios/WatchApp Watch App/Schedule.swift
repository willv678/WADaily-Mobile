//
//  Schedule.swift
//  WatchApp Watch App
//
//  Created by Will Varner on 9/10/22.
//

import Foundation

struct ScheduleGroup: Codable {
    var name: String
    var friendlyName: String
    var schedule: [ScheduleItem]
}

struct ScheduleItem: Codable {
    var startTime: String
    var endTime: String
    var code: String
    var name: String
}
