//
//  Schedule.swift
//  WADaily WatchKit Extension
//
//  Created by Grant Andrews on 4/20/22.
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
